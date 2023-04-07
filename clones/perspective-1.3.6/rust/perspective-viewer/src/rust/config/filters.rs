////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2018, the Perspective Authors.
//
// This file is part of the Perspective library, distributed under the terms
// of the Apache License 2.0.  The full license can be found in the LICENSE
// file.

use itertools::Itertools;
use serde::Deserialize;
use serde::Serialize;
use std::fmt::Display;
use std::str::FromStr;

#[derive(Clone, Deserialize, Debug, PartialEq, Serialize)]
#[serde(untagged)]
pub enum Scalar {
    Float(f64),
    String(String),
    Bool(bool),
    DateTime(f64),
    Null,
    // // Can only have one u64 representation ...
    // Date(u64)
    // Int(u32)
}

impl Display for Scalar {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
        match self {
            Scalar::Float(x) => write!(fmt, "{}", x),
            Scalar::String(x) => write!(fmt, "{}", x),
            Scalar::Bool(x) => write!(fmt, "{}", x),
            Scalar::DateTime(x) => write!(fmt, "{}", x),
            Scalar::Null => write!(fmt, ""),
        }
    }
}

#[allow(clippy::upper_case_acronyms)]
#[derive(Clone, Copy, Deserialize, Debug, PartialEq, Serialize)]
#[serde()]
pub enum FilterOp {
    #[serde(rename = "contains")]
    Contains,

    #[serde(rename = "not in")]
    NotIn,

    #[serde(rename = "in")]
    In,

    #[serde(rename = "begins with")]
    BeginsWith,

    #[serde(rename = "ends with")]
    EndsWith,

    #[serde(rename = "is null")]
    IsNull,

    #[serde(rename = "is not null")]
    IsNotNull,

    #[serde(rename = ">")]
    GT,

    #[serde(rename = "<")]
    LT,

    #[serde(rename = "==")]
    EQ,

    #[serde(rename = ">=")]
    GTE,

    #[serde(rename = "<=")]
    LTE,

    #[serde(rename = "!=")]
    NE,
}

impl Display for FilterOp {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
        let op = match self {
            Self::Contains => "contains",
            Self::In => "in",
            Self::NotIn => "not in",
            Self::BeginsWith => "begins with",
            Self::EndsWith => "ends with",
            Self::IsNull => "is null",
            Self::IsNotNull => "is not null",
            Self::GT => ">",
            Self::LT => "<",
            Self::EQ => "==",
            Self::GTE => ">=",
            Self::LTE => "<=",
            Self::NE => "!=",
        };

        write!(fmt, "{}", op)
    }
}

impl FromStr for FilterOp {
    type Err = String;
    fn from_str(input: &str) -> std::result::Result<Self, <Self as std::str::FromStr>::Err> {
        match input {
            "contains" => Ok(FilterOp::Contains),
            "in" => Ok(FilterOp::In),
            "not in" => Ok(FilterOp::NotIn),
            "begins with" => Ok(FilterOp::BeginsWith),
            "ends with" => Ok(FilterOp::EndsWith),
            "is null" => Ok(FilterOp::IsNull),
            "is not null" => Ok(FilterOp::IsNotNull),
            ">" => Ok(FilterOp::GT),
            "<" => Ok(FilterOp::LT),
            "==" => Ok(FilterOp::EQ),
            ">=" => Ok(FilterOp::GTE),
            "<=" => Ok(FilterOp::LTE),
            "!=" => Ok(FilterOp::NE),
            x => Err(format!("Unknown filter operator {}", x)),
        }
    }
}

#[derive(Clone, Deserialize, Debug, PartialEq, Serialize)]
#[serde(untagged)]
pub enum FilterTerm {
    Scalar(Scalar),
    Array(Vec<Scalar>),
}

impl Display for FilterTerm {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
        match self {
            FilterTerm::Scalar(x) => {
                write!(fmt, "{}", x)?;
            }
            FilterTerm::Array(xs) => write!(
                fmt,
                "{}",
                Itertools::intersperse(xs.iter().map(|x| format!("{}", x)), ",".to_owned())
                    .collect::<String>()
            )?,
        }

        Ok(())
    }
}

#[derive(Clone, Deserialize, Debug, PartialEq, Serialize)]
#[serde()]
pub struct Filter(pub String, pub FilterOp, pub FilterTerm);
