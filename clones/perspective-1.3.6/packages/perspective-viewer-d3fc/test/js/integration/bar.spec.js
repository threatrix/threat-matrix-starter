/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const path = require("path");

const utils = require("@finos/perspective-test");
const simple_tests = require("@finos/perspective-viewer/test/js/simple_tests.js");
// const render_warning_tests = require("@finos/perspective-viewer/test/js/render_warning_tests.js");

const {withTemplate} = require("./simple-template");

withTemplate("bar", "Y Bar");
withTemplate("bar-x", "X Bar");
withTemplate("bar-themed", "Y Bar", {template: "themed-template"});

function get_contents(temp) {
    return async function (page) {
        return await page.evaluate(async (temp) => {
            const viewer = document
                .querySelector(
                    `perspective-viewer perspective-viewer-d3fc-${temp}`
                )
                .shadowRoot.querySelector("svg");
            return viewer.outerHTML || "MISSING";
        }, temp);
    };
}

utils.with_server({}, () => {
    describe.page(
        "bar.html",
        () => {
            simple_tests.default(get_contents("ybar"));
            // render_warning_tests.default("Y Bar");
        },
        {root: path.join(__dirname, "..", "..", "..")}
    );

    describe.page(
        "bar-x.html",
        () => {
            simple_tests.default(get_contents("xbar"));
            // render_warning_tests.default("X Bar");
        },
        {root: path.join(__dirname, "..", "..", "..")}
    );

    describe.page(
        "bar-themed.html",
        () => {
            simple_tests.default(get_contents("ybar"));
            // render_warning_tests.default("Y Bar");
        },
        {root: path.join(__dirname, "..", "..", "..")}
    );
});
