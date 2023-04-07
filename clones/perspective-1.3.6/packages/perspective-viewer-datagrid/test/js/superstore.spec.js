/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

const utils = require("@finos/perspective-test");
const path = require("path");

const simple_tests = require("@finos/perspective-viewer/test/js/simple_tests.js");

async function get_contents(page) {
    return await page.evaluate(async () => {
        const viewer = document.querySelector(
            "perspective-viewer perspective-viewer-datagrid regular-table"
        );
        return viewer.innerHTML || "MISSING";
    });
}

utils.with_server({}, () => {
    describe.page(
        "superstore.html",
        () => {
            simple_tests.default(get_contents);

            test.capture(
                "perspective-config-update event is fired when column style is changed",
                async (page) => {
                    // Await the viewer element to exist on the page
                    const viewer = await page.waitForSelector(
                        "perspective-viewer"
                    );
                    const {x, y} = await page.evaluate(async (viewer) => {
                        // Await the table load
                        await viewer.getTable();

                        // Open the config panel
                        await viewer.toggleConfig();

                        // Register a listener for `perspective-config-update` event
                        window.__events__ = [];
                        viewer.addEventListener(
                            "perspective-config-update",
                            (evt) => {
                                window.__events__.push(evt);
                            }
                        );

                        // Find the column config menu button
                        const header_button = viewer.querySelector(
                            "regular-table thead tr:last-child th"
                        );

                        // Get the button coords (slightly lower than center
                        // because of the location of the menu button within
                        // this element)
                        const rect = header_button.getBoundingClientRect();
                        return {
                            x: Math.floor(rect.left + rect.width / 2),
                            y: Math.floor(rect.top + (3 * rect.height) / 4),
                        };
                    }, viewer);

                    // Click the menu button
                    await page.mouse.click(x, y);

                    // Await the style menu existing on the page
                    const style_menu = await page.waitForSelector(
                        "perspective-number-column-style"
                    );

                    const {x: xx, y: yy} = await page.evaluate(
                        async (style_menu) => {
                            // Find the 'bar' button
                            const bar_button =
                                style_menu.shadowRoot.querySelector(
                                    "#radio-list-3"
                                );

                            // Get its coords
                            const rect = bar_button.getBoundingClientRect();
                            return {
                                x: Math.floor(rect.left + rect.width / 2),
                                y: Math.floor(rect.top + rect.height / 2),
                            };
                        },
                        style_menu
                    );

                    // Click the button
                    await page.mouse.click(xx, yy);

                    const count = await page.evaluate(async (viewer) => {
                        // Await the plugin rendering
                        await viewer.flush();

                        // Count the events;
                        return window.__events__.length;
                    }, viewer);

                    // Expect 1 event
                    expect(count).toEqual(1);

                    // Return the `<table>` contents
                    return get_contents(page);
                }
            );

            // test.capture("resets viewable area when the logical size expands.", async page => {
            //     const viewer = await page.$("perspective-viewer");
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());
            //     await page.evaluate(element => element.setAttribute("column-pivots", '["Category"]'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("row-pivots", '["City"]'), viewer);
            // });

            // test.capture("resets viewable area when the physical size expands.", async page => {
            //     const viewer = await page.$("perspective-viewer");
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());
            //     await page.evaluate(element => element.setAttribute("row-pivots", '["Category"]'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("row-pivots", "[]"), viewer);
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());
            // });

            // test.capture("perspective dispatches perspective-click event with correct details", async page => {
            //     const detail = await click_details(page);
            //     expect(detail).toEqual({
            //         row: {
            //             "Ship Mode": "Standard Class",
            //             Country: "United States",
            //             "Customer ID": "BH-11710",
            //             Discount: 0.2,
            //             "Order Date": 1307577600000,
            //             "Order ID": "CA-2011-115812",
            //             "Postal Code": 90032,
            //             "Product ID": "TEC-PH-10002033",
            //             Profit: 68.3568,
            //             Quantity: 4,
            //             Region: "West",
            //             "Row ID": 12,
            //             Sales: 911.424,
            //             Segment: "Consumer",
            //             "Ship Date": 1308009600000,
            //             Category: "Technology",
            //             City: "Los Angeles",
            //             State: "California",
            //             "Sub-Category": "Phones"
            //         },
            //         column_names: ["Order Date"],
            //         config: {filters: []}
            //     });
            // });

            // test.capture("perspective dispatches perspective-click event with correct details when filter is set", async page => {
            //     const viewer = await page.$("perspective-viewer");
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());
            //     await page.evaluate(element => element.setAttribute("row-pivots", '["State", "Category"]'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     const detail = await click_details(page, 310, 320);
            //     expect(detail).toEqual({
            //         row: {
            //             __ROW_PATH__: ["California", "Office Supplies"],
            //             Category: 15,
            //             City: 15,
            //             Country: 15,
            //             "Customer ID": 15,
            //             Discount: 1,
            //             "Order Date": 15,
            //             "Order ID": 15,
            //             "Postal Code": 1370894,
            //             "Product ID": 15,
            //             Profit: 183.47429999999997,
            //             Quantity: 46,
            //             Region: 15,
            //             "Row ID": 712,
            //             Sales: 562.848,
            //             Segment: 15,
            //             "Ship Date": 15,
            //             "Ship Mode": 15,
            //             State: 15,
            //             "Sub-Category": 15
            //         },
            //         config: {
            //             filters: [
            //                 ["State", "==", "California"],
            //                 ["Category", "==", "Office Supplies"]
            //             ]
            //         }
            //     });
            // });

            // test.capture("expression columns have the right group by headers", async page => {
            //     const viewer = await page.$("perspective-viewer");
            //     await page.evaluate(async () => await document.querySelector("perspective-viewer").toggleConfig());

            //     // create expression columns with aliases
            //     await page.evaluate(element => element.setAttribute("expressions", JSON.stringify([`// abc\n upper("State")`, `// def \n bucket("Order Date", 'M')`])), viewer);
            //     await page.evaluate(element => element.setAttribute("row-pivots", '["abc"]'), viewer);
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.waitForSelector("perspective-viewer:not([updating])");
            //     await page.evaluate(element => element.setAttribute("columns", '["abc", "def"]'), viewer);
            // });
        },
        {root: path.join(__dirname, "..", "..")}
    );
});

// const click_details = async (page, x = 310, y = 300) => {
//     const viewer = await page.$("perspective-viewer");

//     const click_event = page.evaluate(
//         element =>
//             new Promise(resolve => {
//                 element.addEventListener("perspective-click", e => {
//                     resolve(e.detail);
//                 });
//             }),
//         viewer
//     );
//     await page.mouse.click(x, y);
//     return await click_event;
// };
