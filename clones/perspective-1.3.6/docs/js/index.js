import perspective from "@finos/perspective";

perspective.shared_worker();

import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";

import "./logo.js";
import "./concepts.js";

import {EXAMPLES} from "./features.js";

var SECURITIES = [
    "AAPL.N",
    "MSFT.N",
    "AMZN.N",
    "GOOGL.N",
    "FB.N",
    "TSLA.N",
    "BABA.N",
    "TSM.N",
    "V.N",
    "NVDA.N",
    "JPM.N",
    "JNJ.N",
    "WMT.N",
    "UNH.N",
    "MA.N",
    "BAC.N",
    "DIS.N",
    "ASML.N",
    "ADBE.N",
    "CMCSA.N",
    "NKE.N",
    "XOM.N",
    "TM.N",
    "KO.N",
    "ORCL.N",
    "NFLX.N",
];

var CLIENTS = [
    "Homer",
    "Marge",
    "Bart",
    "Lisa",
    "Maggie",
    "Barney",
    "Ned",
    "Moe",
];
var id = 0;

function randn_bm() {
    var u = 0,
        v = 0;
    while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
    while (v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function newRow() {
    id = id % 1000;
    return {
        name: SECURITIES[Math.floor(Math.random() * SECURITIES.length)],
        client: CLIENTS[Math.floor(Math.random() * CLIENTS.length)],
        lastUpdate: new Date(),
        chg: randn_bm() * 10,
        bid: randn_bm() * 5 + 95,
        ask: randn_bm() * 5 + 105,
        vol: randn_bm() * 5 + 105,
        id: id++,
    };
}

var freq = 100,
    elem;

function update(table) {
    if (freq !== 190) {
        var viewport_height = document.documentElement.clientHeight;
        if (viewport_height - window.scrollY > 0) {
            table.update([newRow(), newRow(), newRow()]);
        }
    }

    setTimeout(() => update(table), freq);
}

function select(id) {
    Array.prototype.slice
        .call(document.querySelectorAll(".buttonWrapper"))
        .map((x) => x.classList.remove("selected"));
    document.querySelector(id).classList.add("selected");
    const viewer = document.querySelector("perspective-viewer");
    viewer.restore(
        {
            "#grid": {
                plugin: "Datagrid",
                columns: ["chg (-)", "chg", "chg (+)"],
                expressions: [
                    '//chg (-)\nif("chg"<0){"chg"}else{0}',
                    '//chg (+)\nif("chg">0){"chg"}else{0}',
                ],
                group_by: ["name"],
                split_by: ["client"],
                aggregates: {"chg (-)": "avg", "chg (+)": "avg", chg: "avg"},
                sort: [["chg", "desc"]],
                plugin_config: {
                    columns: {
                        "chg (-)": {
                            number_color_mode: "bar",
                            gradient: 10,
                        },
                        "chg (+)": {
                            number_color_mode: "bar",
                            gradient: 10,
                        },
                        chg: {
                            number_color_mode: "gradient",
                            gradient: 10,
                        },
                    },
                },
            },
            "#grid2": {
                plugin: "datagrid",
                columns: ["ask", "bid", "chg"],
                sort: [
                    ["name", "desc"],
                    ["lastUpdate", "desc"],
                ],
                aggregates: {name: "last", lastUpdate: "last"},
                group_by: ["name", "lastUpdate"],
                split_by: ["client"],
                plugin_config: {},
            },
            "#cyclone": {
                columns: ["chg"],
                plugin: "X Bar",
                sort: [["chg", "asc"]],
                group_by: ["name"],
                split_by: ["client"],
            },
            "#pivot": {
                columns: ["vol"],
                plugin: "Heatmap",
                sort: [["vol", "asc"]],
                group_by: ["name"],
                split_by: ["client"],
            },
            "#crosssect": {
                plugin: "X/Y Scatter",
                group_by: ["name"],
                split_by: [],
                columns: ["bid", "ask", "chg", "vol"],
                aggregates: {bid: "avg", ask: "avg", vol: "avg"},
                sort: [],
            },
            "#intersect": {
                plugin: "Treemap",
                group_by: ["name", "client"],
                split_by: [],
                columns: ["bid", "chg"],
                aggregates: {bid: "sum", chg: "sum", name: "last"},
                sort: [
                    ["name", "desc"],
                    ["chg", "desc"],
                ],
            },
            "#enhance": {
                plugin: "Y Line",
                group_by: ["lastUpdate"],
                split_by: [],
                sort: [["lastUpdate", "desc"]],
                split_by: ["client"],
                columns: ["bid"],
                aggregates: {bid: "avg", chg: "avg", name: "last"},
            },
        }[id] || {}
    );
}

function get_arrow(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "arrow/superstore.arrow", true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
        callback(xhr.response);
    };
    xhr.send(null);
}

window.addEventListener("DOMContentLoaded", async function () {
    for (const img of document.querySelectorAll("img")) {
        if (img.dataset.src) {
            img.setAttribute("src", img.dataset.src);
        }
    }

    if (
        window.location.pathname !== "/" &&
        window.location.pathname !== "/index.html"
    ) {
        return;
    }

    var data = [];
    for (var x = 0; x < 1000; x++) {
        data.push(newRow());
    }
    elem = Array.prototype.slice.call(
        document.querySelectorAll("perspective-viewer")
    )[0];
    var worker = perspective.shared_worker();
    var tbl = worker.table(data, {index: "id"});
    elem.load(tbl);
    elem.toggleConfig();

    setTimeout(async function () {
        let table = await tbl;
        update(table, 0);
    });

    document
        .querySelector("#velocity")
        .addEventListener("input", function (event) {
            freq = (-9 / 5) * this.value + 190;
        });

    document
        .querySelector("#grid")
        .addEventListener("mouseenter", () => select("#grid"));
    document
        .querySelector("#grid2")
        .addEventListener("mouseenter", () => select("#grid2"));
    document
        .querySelector("#cyclone")
        .addEventListener("mouseenter", () => select("#cyclone"));
    document
        .querySelector("#pivot")
        .addEventListener("mouseenter", () => select("#pivot"));
    document
        .querySelector("#crosssect")
        .addEventListener("mouseenter", () => select("#crosssect"));
    document
        .querySelector("#intersect")
        .addEventListener("mouseenter", () => select("#intersect"));
    document
        .querySelector("#enhance")
        .addEventListener("mouseenter", () => select("#enhance"));

    select("#grid");

    get_arrow(async function (arrow) {
        const container = document.createElement("div");
        container.classList.add("floating_example");
        container.addEventListener("click", (event) => {
            if (event.target === container) {
                container.style.display = "none";
            }
        });

        const psp1 = document.createElement("perspective-viewer");
        container.style.display = "none";
        container.appendChild(psp1);
        document.body.appendChild(container);
        const tbl1 = worker.table(arrow.slice());
        await psp1.load(tbl1);

        const config_defaults = (config) =>
            Object.assign(
                {
                    plugin_config: {},
                    plugin: "Datagrid",
                    group_by: [],
                    columns: [],
                    expressions: [],
                    split_by: [],
                    sort: [],
                    aggregates: {},
                },
                config
            );
        // let first_render = true;

        for (const image of document.querySelectorAll("a.feature")) {
            image.addEventListener("click", async (event) => {
                event.preventDefault();
                const key = parseInt(image.dataset.key);
                container.style.opacity = 0;
                container.style.pointerEvents = "none";
                container.style.display = "flex";
                await psp1.restore(config_defaults(EXAMPLES[key].config));
                await psp1.toggleConfig(true);
                await psp1.notifyResize(true);
                container.style.opacity = 1;
                container.style.pointerEvents = "";
            });
        }

        document
            .querySelector("#switch_theme")
            .addEventListener("click", async function () {
                const button = this.querySelector(".button");
                const section = document.querySelector(
                    ".productShowcaseSection"
                );
                const dark = document.querySelector(
                    ".productShowcaseSection #dark"
                );
                const light = document.querySelector(
                    ".productShowcaseSection #light"
                );
                let theme;
                if (button.innerText === "SWITCH TO DARK THEME") {
                    button.innerText = "Switch to Light Theme";
                    dark.style.display = "flex";
                    light.style.display = "none";
                    theme = "Material Dark";
                    section.classList.toggle("dark", true);
                    container.classList.toggle("dark", true);
                } else {
                    button.innerText = "Switch to Dark Theme";
                    dark.style.display = "none";
                    light.style.display = "flex";
                    theme = "Material Light";
                    section.classList.toggle("dark", false);
                    container.classList.toggle("dark", false);
                }
                await psp1.restore({
                    plugin: "Y Bar",
                    group_by: ["State"],
                    columns: ["Sales"],
                    theme,
                });
            });
    });
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        document.querySelector(".logo").style.opacity = 1;
    } else {
        document.querySelector(".logo").style.opacity = 0;
    }
});
