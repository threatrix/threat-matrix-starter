////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2018, the Perspective Authors.
//
// This file is part of the Perspective library, distributed under the terms
// of the Apache License 2.0.  The full license can be found in the LICENSE
// file.

use crate::components::status_bar::*;
use crate::renderer::*;
use crate::session::*;
use crate::utils::*;
use crate::*;

use std::cell::Cell;
use std::rc::Rc;
use wasm_bindgen::JsCast;
use wasm_bindgen_test::*;
use web_sys::*;
use yew::prelude::*;

wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
pub fn test_callbacks_invoked() {
    let link: WeakScope<StatusBar> = WeakScope::default();
    let token = Rc::new(Cell::new(0));
    let on_reset = Callback::from({
        clone!(token);
        move |_| token.set(1)
    });

    let elem: HtmlElement = window()
        .unwrap()
        .document()
        .unwrap()
        .create_element("div")
        .unwrap()
        .unchecked_into();
    let session = Session::default();
    let renderer = Renderer::new(elem, session.clone());

    test_html! {
        <StatusBar
            id="test"
            weak_link={ link.clone() }
            session={ session }
            renderer={ renderer }
            on_reset={ on_reset }>
        </StatusBar>
    };

    assert_eq!(token.get(), 0);
    let status_bar = link.borrow().clone().unwrap();
    status_bar.send_message(StatusBarMsg::Export);
    assert_eq!(token.get(), 0);
    let status_bar = link.borrow().clone().unwrap();
    status_bar.send_message(StatusBarMsg::Copy);
    assert_eq!(token.get(), 0);
    let status_bar = link.borrow().clone().unwrap();
    status_bar.send_message(StatusBarMsg::Reset(false));
    assert_eq!(token.get(), 1);
}

fn gen(stats: &Option<TableStats>) -> (HtmlElement, Session) {
    let link: WeakScope<StatusBar> = WeakScope::default();
    let div = NodeRef::default();
    let on_reset = Callback::from(|_| ());
    let session = Session::default();
    let elem: HtmlElement = window()
        .unwrap()
        .document()
        .unwrap()
        .create_element("div")
        .unwrap()
        .unchecked_into();

    let renderer = Renderer::new(elem, session.clone());
    test_html! {
        <StatusBar
            id="test"
            weak_link={ link.clone() }
            ref={ div.clone() }
            session={ session.clone() }
            renderer={ renderer }
            on_reset={ on_reset }>
        </StatusBar>
    };

    if let Some(stats) = stats.as_ref() {
        session.set_stats(stats.clone());
        link.borrow()
            .as_ref()
            .unwrap()
            .send_message(StatusBarMsg::TableStatsChanged);
    }

    (div.cast::<HtmlElement>().unwrap(), session)
}

#[wasm_bindgen_test]
pub fn test_status_uninitialized() {
    let stats = None;
    let (div, session) = gen(&stats);
    assert_eq!(session.get_table_stats(), stats);
    let status_class = div.query_selector("#status").unwrap().unwrap().class_name();
    assert_eq!(status_class, "uninitialized");
}

#[wasm_bindgen_test]
pub fn test_status_initializing() {
    let stats = Some(TableStats {
        is_pivot: false,
        num_rows: None,
        virtual_rows: None,
    });

    let (div, session) = gen(&stats);
    assert_eq!(session.get_table_stats(), stats);
    let status_class = div.query_selector("#status").unwrap().unwrap().class_name();
    assert_eq!(status_class, "initializing");
}

#[wasm_bindgen_test]
pub fn test_status_table_loaded() {
    let stats = Some(TableStats {
        is_pivot: false,
        num_rows: Some(12345678),
        virtual_rows: None,
    });

    let (div, session) = gen(&stats);
    assert_eq!(session.get_table_stats(), stats);
    let status_class = div.query_selector("#status").unwrap().unwrap().class_name();
    assert_eq!(status_class, "connected");
    let rows = div.query_selector("#rows").unwrap().unwrap().inner_html();
    assert_eq!(rows, "<span>12,345,678 rows</span>");
}

#[wasm_bindgen_test]
pub fn test_status_table_and_view_loaded() {
    let stats = Some(TableStats {
        is_pivot: true,
        num_rows: Some(12345678),
        virtual_rows: Some(54321),
    });

    let (div, session) = gen(&stats);
    assert_eq!(session.get_table_stats(), stats);
    let status_class = div.query_selector("#status").unwrap().unwrap().class_name();
    assert_eq!(status_class, "connected");
    let rows = div.query_selector("#rows").unwrap().unwrap().inner_html();
    assert_eq!(
        rows,
        "<span>54,321 </span><span id=\"counter-arrow\" class=\"icon\"></span><span> 12,345,678 \
         rows</span>"
    );
}
