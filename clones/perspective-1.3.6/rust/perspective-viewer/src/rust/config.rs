////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2018, the Perspective Authors.
//
// This file is part of the Perspective library, distributed under the terms
// of the Apache License 2.0.  The full license can be found in the LICENSE
// file.

mod aggregates;
mod column_type;
mod filters;
mod sort;
mod view_config;

pub use aggregates::*;
pub use column_type::*;
pub use filters::*;
pub use sort::*;
pub use view_config::*;

// use crate::renderer::Renderer;
use crate::utils::*;
use flate2::read::ZlibDecoder;
use flate2::write::ZlibEncoder;
use flate2::Compression;
use serde::Deserialize;
use serde::Deserializer;
use serde::Serialize;
use serde_json::Value;
use std::io::Read;
use std::io::Write;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;

#[derive(Deserialize)]
pub enum ViewerConfigEncoding {
    #[serde(rename = "json")]
    Json,

    #[serde(rename = "string")]
    String,

    #[serde(rename = "arraybuffer")]
    ArrayBuffer,

    #[serde(skip_serializing)]
    JSONString,
}

#[derive(Serialize, PartialEq)]
#[serde(deny_unknown_fields)]
pub struct ViewerConfig {
    pub plugin: String,
    pub plugin_config: Value,
    pub settings: bool,
    pub theme: Option<String>,

    #[serde(flatten)]
    pub view_config: ViewConfig,
}

impl ViewerConfig {
    // pub fn new(renderer: &Renderer) -> Self {
    //     Self {
    //         plugin: renderer.get_active_plugin().unwrap().name(),
    //         view_config: ViewConfig::default(),
    //         plugin_config: Value::Null,
    //         theme: None,
    //         settings: false,
    //     }
    // }

    /// Encode a `ViewerConfig` to a `JsValue` in a supported type.
    pub fn encode(&self, format: &Option<ViewerConfigEncoding>) -> Result<JsValue, JsValue> {
        match format {
            Some(ViewerConfigEncoding::String) => {
                let mut encoder = ZlibEncoder::new(Vec::new(), Compression::default());
                let bytes = rmp_serde::to_vec(self).into_jserror()?;
                encoder.write_all(&bytes).into_jserror()?;
                let encoded = encoder.finish().into_jserror()?;
                Ok(JsValue::from(base64::encode(encoded)))
            }
            Some(ViewerConfigEncoding::ArrayBuffer) => {
                let array = js_sys::Uint8Array::from(&rmp_serde::to_vec(self).unwrap()[..]);
                let start = array.byte_offset();
                let len = array.byte_length();
                Ok(array
                    .buffer()
                    .slice_with_end(start, start + len)
                    .unchecked_into())
            }
            Some(ViewerConfigEncoding::JSONString) => {
                Ok(JsValue::from(serde_json::to_string(self).into_jserror()?))
            }
            None | Some(ViewerConfigEncoding::Json) => JsValue::from_serde(self).into_jserror(),
        }
    }
}

#[derive(Deserialize)]
#[serde(deny_unknown_fields)]
pub struct ViewerConfigUpdate {
    #[serde(default)]
    pub plugin: PluginUpdate,

    #[serde(default)]
    pub theme: ThemeUpdate,

    #[serde(default)]
    pub settings: SettingsUpdate,

    #[serde(default)]
    pub plugin_config: Option<Value>,

    #[serde(flatten)]
    pub view_config: ViewConfigUpdate,
}

impl ViewerConfigUpdate {
    /// Decode a `JsValue` into a `ViewerConfigUpdate` by auto-detecting format
    /// from JavaScript type.
    pub fn decode(update: &JsValue) -> Result<Self, JsValue> {
        if update.is_string() {
            let js_str = update.as_string().into_jserror()?;
            let bytes = base64::decode(js_str).into_jserror()?;
            let mut decoder = ZlibDecoder::new(&*bytes);
            let mut decoded = vec![];
            decoder.read_to_end(&mut decoded).into_jserror()?;
            rmp_serde::from_slice(&decoded).into_jserror()
        } else if update.is_instance_of::<js_sys::ArrayBuffer>() {
            let uint8array = js_sys::Uint8Array::new(update);
            let mut slice = vec![0; uint8array.length() as usize];
            uint8array.copy_to(&mut slice[..]);
            rmp_serde::from_slice(&slice).into_jserror()
        } else {
            update.into_serde().into_jserror()
        }
    }
}

#[derive(Clone)]
pub enum OptionalUpdate<T: Clone> {
    SetDefault,
    Missing,
    Update(T),
}

pub type PluginUpdate = OptionalUpdate<String>;
pub type SettingsUpdate = OptionalUpdate<bool>;
pub type ThemeUpdate = OptionalUpdate<String>;

/// Handles `{}` when included as a field with `#[serde(default)]`.
impl<T: Clone> Default for OptionalUpdate<T> {
    fn default() -> Self {
        Self::Missing
    }
}

/// Handles `{plugin: null}` and `{plugin: val}` by treating this type as an
/// option.
impl<T: Clone> From<Option<T>> for OptionalUpdate<T> {
    fn from(opt: Option<T>) -> Self {
        match opt {
            Some(v) => Self::Update(v),
            None => Self::SetDefault,
        }
    }
}

/// Treats `PluginUpdate` enum as an `Option<T>` when present during
/// deserialization.
impl<'a, T> Deserialize<'a> for OptionalUpdate<T>
where
    T: Deserialize<'a> + Clone,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'a>,
    {
        Option::deserialize(deserializer).map(Into::into)
    }
}
