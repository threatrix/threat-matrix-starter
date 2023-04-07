/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */

import * as React from "react";
import * as ReactDOM from "react-dom";
import * as perspective from "@finos/perspective";

import "@finos/perspective-viewer";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import {
    PerspectiveViewerConfig,
    HTMLPerspectiveViewerElement,
} from "@finos/perspective-viewer";

import "./index.css";

const worker = perspective.default.shared_worker();

const getTable = async (): Promise<perspective.Table> => {
    const req = fetch("./superstore.arrow");
    const resp = await req;
    const buffer = await resp.arrayBuffer();
    return await worker.table(buffer as any);
};

const config: PerspectiveViewerConfig = {
    group_by: ["State"],
};

const App = (): React.ReactElement => {
    const viewer = React.useRef<HTMLPerspectiveViewerElement>(null);

    React.useEffect(() => {
        getTable().then((table) => {
            if (viewer.current) {
                viewer.current.load(Promise.resolve(table));
                viewer.current.restore(config);
            }
        });
    }, []);

    return <perspective-viewer ref={viewer}></perspective-viewer>;
};

window.addEventListener("load", () => {
    ReactDOM.render(<App />, document.getElementById("root"));
});
