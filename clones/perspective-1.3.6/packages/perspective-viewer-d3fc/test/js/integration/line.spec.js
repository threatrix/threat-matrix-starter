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
withTemplate("line", "Y Line");

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
        "line.html",
        () => {
            simple_tests.default(get_contents("yline"));

            // test.capture("Sets a category axis when pivoted by an expression datetime", async page => {
            //     const viewer = await page.$("perspective-viewer");
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());
            //     await page.evaluate(element => element.setAttribute("expressions", JSON.stringify([`// abc \n bucket("Ship Date", 'M')`])), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("row-pivots", JSON.stringify(["abc"])), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("columns", '["State","Sales"]'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("aggregates", '{"State":"dominant","Sales":"sum"}'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            // });
        },
        {reload_page: false, root: path.join(__dirname, "..", "..", "..")}
    );
});
