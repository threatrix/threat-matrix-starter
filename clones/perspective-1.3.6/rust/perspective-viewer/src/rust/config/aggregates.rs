////////////////////////////////////////////////////////////////////////////////
//
// Copyright (c) 2018, the Perspective Authors.
//
// This file is part of the Perspective library, distributed under the terms
// of the Apache License 2.0.  The full license can be found in the LICENSE
// file.

use super::column_type::*;
use std::str::FromStr;

use serde::Deserialize;
use serde::Serialize;
use std::fmt::Display;
use wasm_bindgen::*;

#[derive(Clone, Copy, Debug, Deserialize, Eq, Ord, PartialEq, PartialOrd, Serialize)]
#[serde()]
pub enum SingleAggregate {
    #[serde(rename = "sum")]
    Sum,

    #[serde(rename = "sum abs")]
    SumAbs,

    #[serde(rename = "sum not null")]
    SumNotNull,

    #[serde(rename = "abs sum")]
    AbsSum,

    #[serde(rename = "pct sum parent")]
    PctSumParent,

    #[serde(rename = "pct sum grand total")]
    PctSumGrandTotal,

    #[serde(rename = "any")]
    Any,

    #[serde(rename = "unique")]
    Unique,

    #[serde(rename = "dominant")]
    Dominant,

    #[serde(rename = "median")]
    Median,

    #[serde(rename = "first")]
    First,

    #[serde(rename = "last by index")]
    LastByIndex,

    #[serde(rename = "last minus first")]
    LastMinusFirst,

    #[serde(rename = "last")]
    Last,

    #[serde(rename = "count")]
    Count,

    #[serde(rename = "distinct count")]
    DistinctCount,

    #[serde(rename = "avg")]
    Avg,

    #[serde(rename = "mean")]
    Mean,

    #[serde(rename = "join")]
    Join,

    #[serde(rename = "high")]
    High,

    #[serde(rename = "low")]
    Low,

    #[serde(rename = "high minus low")]
    HighMinusLow,

    #[serde(rename = "stddev")]
    StdDev,

    #[serde(rename = "var")]
    Var,
}

impl Display for SingleAggregate {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> Result<(), std::fmt::Error> {
        let term = match self {
            SingleAggregate::Sum => "sum",
            SingleAggregate::SumAbs => "sum abs",
            SingleAggregate::SumNotNull => "sum not null",
            SingleAggregate::AbsSum => "abs sum",
            SingleAggregate::PctSumParent => "pct sum parent",
            SingleAggregate::PctSumGrandTotal => "pct sum grand total",
            SingleAggregate::Any => "any",
            SingleAggregate::Unique => "unique",
            SingleAggregate::Dominant => "dominant",
            SingleAggregate::Median => "median",
            SingleAggregate::First => "first",
            SingleAggregate::LastByIndex => "last by index",
            SingleAggregate::LastMinusFirst => "last minus first",
            SingleAggregate::Last => "last",
            SingleAggregate::Count => "count",
            SingleAggregate::DistinctCount => "distinct count",
            SingleAggregate::Avg => "avg",
            SingleAggregate::Mean => "mean",
            SingleAggregate::Join => "join",
            SingleAggregate::High => "high",
            SingleAggregate::Low => "low",
            SingleAggregate::HighMinusLow => "high minus low",
            SingleAggregate::StdDev => "stddev",
            SingleAggregate::Var => "var",
        };

        write!(fmt, "{}", term)
    }
}

impl FromStr for SingleAggregate {
    type Err = JsValue;
    fn from_str(value: &str) -> Result<Self, JsValue> {
        match value {
            "sum" => Ok(SingleAggregate::Sum),
            "sum abs" => Ok(SingleAggregate::SumAbs),
            "sum not null" => Ok(SingleAggregate::SumNotNull),
            "abs sum" => Ok(SingleAggregate::AbsSum),
            "pct sum parent" => Ok(SingleAggregate::PctSumParent),
            "pct sum grand total" => Ok(SingleAggregate::PctSumGrandTotal),
            "any" => Ok(SingleAggregate::Any),
            "unique" => Ok(SingleAggregate::Unique),
            "dominant" => Ok(SingleAggregate::Dominant),
            "median" => Ok(SingleAggregate::Median),
            "first" => Ok(SingleAggregate::First),
            "last by index" => Ok(SingleAggregate::LastByIndex),
            "last minus first" => Ok(SingleAggregate::LastMinusFirst),
            "last" => Ok(SingleAggregate::Last),
            "count" => Ok(SingleAggregate::Count),
            "distinct count" => Ok(SingleAggregate::DistinctCount),
            "avg" => Ok(SingleAggregate::Avg),
            "mean" => Ok(SingleAggregate::Mean),
            "join" => Ok(SingleAggregate::Join),
            "high" => Ok(SingleAggregate::High),
            "low" => Ok(SingleAggregate::Low),
            "high minus low" => Ok(SingleAggregate::HighMinusLow),
            "stddev" => Ok(SingleAggregate::StdDev),
            "var" => Ok(SingleAggregate::Var),
            x => Err(format!("Unknown aggregate `{}`", x).into()),
        }
    }
}

#[derive(Clone, Debug, Deserialize, Eq, Ord, PartialEq, PartialOrd, Serialize)]
#[serde()]
pub enum MultiAggregate {
    #[serde(rename = "weighted mean")]
    WeightedMean,
}

#[derive(Clone, Debug, Deserialize, Eq, Ord, PartialEq, PartialOrd, Serialize)]
#[serde(untagged)]
pub enum Aggregate {
    SingleAggregate(SingleAggregate),
    MultiAggregate(MultiAggregate, String),
}

impl Display for Aggregate {
    fn fmt(&self, fmt: &mut std::fmt::Formatter<'_>) -> std::result::Result<(), std::fmt::Error> {
        match self {
            Aggregate::SingleAggregate(x) => write!(fmt, "{}", x)?,
            Aggregate::MultiAggregate(MultiAggregate::WeightedMean, x) => {
                write!(fmt, "weighted mean by {}", x)?
            }
        };
        Ok(())
    }
}

impl FromStr for Aggregate {
    type Err = JsValue;
    fn from_str(input: &str) -> std::result::Result<Self, JsValue> {
        Ok(
            if let Some(stripped) = input.strip_prefix("weighted mean by ") {
                Aggregate::MultiAggregate(MultiAggregate::WeightedMean, stripped.to_owned())
            } else {
                Aggregate::SingleAggregate(SingleAggregate::from_str(input)?)
            },
        )
    }
}

const STRING_AGGREGATES: &[SingleAggregate] = &[
    SingleAggregate::Any,
    SingleAggregate::Count,
    SingleAggregate::DistinctCount,
    SingleAggregate::Dominant,
    SingleAggregate::First,
    SingleAggregate::Join,
    SingleAggregate::Last,
    SingleAggregate::LastByIndex,
    SingleAggregate::Median,
    SingleAggregate::Unique,
];

const NUMBER_AGGREGATES: &[SingleAggregate] = &[
    SingleAggregate::AbsSum,
    SingleAggregate::Any,
    SingleAggregate::Avg,
    SingleAggregate::Count,
    SingleAggregate::DistinctCount,
    SingleAggregate::Dominant,
    SingleAggregate::First,
    SingleAggregate::High,
    SingleAggregate::Low,
    SingleAggregate::HighMinusLow,
    SingleAggregate::LastByIndex,
    SingleAggregate::LastMinusFirst,
    SingleAggregate::Last,
    SingleAggregate::Mean,
    SingleAggregate::Median,
    SingleAggregate::PctSumParent,
    SingleAggregate::PctSumGrandTotal,
    SingleAggregate::StdDev,
    SingleAggregate::Sum,
    SingleAggregate::SumAbs,
    SingleAggregate::SumNotNull,
    SingleAggregate::Unique,
    SingleAggregate::Var,
];

impl Type {
    pub fn aggregates_iter(&self) -> Box<dyn Iterator<Item = Aggregate>> {
        match self {
            Type::Bool | Type::Date | Type::Datetime | Type::String => Box::new(
                STRING_AGGREGATES
                    .iter()
                    .map(|x| Aggregate::SingleAggregate(*x)),
            ),
            Type::Integer | Type::Float => Box::new(
                NUMBER_AGGREGATES
                    .iter()
                    .map(|x| Aggregate::SingleAggregate(*x)),
            ),
        }
    }

    pub const fn default_aggregate(&self) -> Aggregate {
        match self {
            Type::Bool | Type::Date | Type::Datetime | Type::String => {
                Aggregate::SingleAggregate(SingleAggregate::Count)
            }
            Type::Integer | Type::Float => Aggregate::SingleAggregate(SingleAggregate::Sum),
        }
    }
}
