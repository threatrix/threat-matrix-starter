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

const {withTemplate} = require("./simple-template");
withTemplate("area", "Y Area");

async function get_contents(page) {
    return await page.evaluate(async () => {
        const viewer = document
            .querySelector("perspective-viewer perspective-viewer-d3fc-yarea")
            .shadowRoot.querySelector("svg");
        return viewer.outerHTML || "MISSING";
    });
}

utils.with_server({}, () => {
    describe.page(
        "area.html",
        () => {
            simple_tests.default(get_contents);
        },
        {root: path.join(__dirname, "..", "..", "..")}
    );
});
