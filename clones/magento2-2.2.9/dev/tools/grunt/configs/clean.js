/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Maxdzy/eduMagenta2/releases/tag/master-3cdf78f
*    Source File: clean.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Open Software License 3.0
*      SPDXId: OSL-3.0
*    
*      Academic Free License v3.0
*      SPDXId: AFL-3.0
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

'use strict';

var themes = require('../tools/files-router').get('themes'),
    _      = require('underscore');

var themeOptions = {};

_.each(themes, function(theme, name) {
    themeOptions[name] = {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.tmp %>/cache/**/*",
                    "<%= combo.autopath(\""+name+"\", path.pub ) %>**/*",
                    "<%= combo.autopath(\""+name+"\", path.tmpLess) %>**/*",
                    "<%= combo.autopath(\""+name+"\", path.tmpSource) %>**/*",
                    "<%= path.deployedVersion %>"
                ]
            }
        ]
    };
});

var cleanOptions = {
    "var": {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.tmp %>/cache/**/*",
                    "<%= path.tmp %>/generation/**/*",
                    "<%= path.tmp %>/log/**/*",
                    "<%= path.tmp %>/maps/**/*",
                    "<%= path.tmp %>/page_cache/**/*",
                    "<%= path.tmp %>/tmp/**/*",
                    "<%= path.tmp %>/view/**/*",
                    "<%= path.tmp %>/view_preprocessed/**/*"
                ]
            }
        ]
    },
    "pub": {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.pub %>frontend/**/*",
                    "<%= path.pub %>adminhtml/**/*",
                    "<%= path.deployedVersion %>"
                ]
            }
        ]
    },
    "styles": {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.tmp %>/view_preprocessed/**/*",
                    "<%= path.tmp %>/cache/**/*",
                    "<%= path.pub %>frontend/**/*.less",
                    "<%= path.pub %>frontend/**/*.css",
                    "<%= path.pub %>adminhtml/**/*.less",
                    "<%= path.pub %>adminhtml/**/*.css",
                    "<%= path.deployedVersion %>"
                ]
            }
        ]
    },
    "markup": {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.tmp %>/cache/**/*",
                    "<%= path.tmp %>/generation/**/*",
                    "<%= path.tmp %>/view_preprocessed/html/**/*",
                    "<%= path.tmp %>/page_cache/**/*"
                ]
            }
        ]
    },
    "js": {
        "force": true,
        "files": [
            {
                "force": true,
                "dot": true,
                "src": [
                    "<%= path.pub %>**/*.js",
                    "<%= path.pub %>**/*.html",
                    "<%= path.pub %>_requirejs/**/*",
                    "<%= path.deployedVersion %>"
                ]
            }
        ]
    }
};

module.exports = _.extend(cleanOptions, themeOptions);

