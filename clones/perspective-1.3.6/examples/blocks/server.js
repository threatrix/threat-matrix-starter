/******************************************************************************
 *
 * Copyright (c) 2017, the Perspective Authors.
 *
 * This file is part of the Perspective library, distributed under the terms of
 * the Apache License 2.0.  The full license can be found in the LICENSE file.
 *
 */
const fs = require("fs");
const {WebSocketServer} = require("@finos/perspective");

const template = (body) => `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
</head>
<body>
    <ul id="list">
        ${body}
    </ul>
</body>
</html>
`;

const prod_template = (name) => `
<li>
    <a href="src/${name}/index.html">local</a>
    <a href="dist/${name}/index.html">dist</a>
    ${name}
</li>
`;

const dev_template = (name) => `
<li>
    <a href="src/${name}/index.html">local</a>
    ${name}
</li>
`;

const gists = JSON.parse(fs.readFileSync("gists.json"));

const lis = [];
for (const key of fs.readdirSync("src")) {
    if (!!gists[key]) {
        lis.push(prod_template(key));
    } else {
        lis.push(dev_template(key));
    }
}

fs.writeFileSync("dist/index.html", template(lis.join("\n")));

new WebSocketServer({assets: [__dirname, "dist", "../../"]});
