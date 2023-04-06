/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/CreateStores/training_test/releases/tag/master-1365734
*    Source File: exec.js
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

var combo = require('./combo'),
    themes = require('../tools/files-router').get('themes'),
    _      = require('underscore');

var themeOptions = {};

_.each(themes, function(theme, name) {
    themeOptions[name] = {
        cmd: combo.collector.bind(combo, name)
    };
});

var execOptions = {
    all : {
        cmd: function () {
            var cmdPlus = (/^win/.test(process.platform) == true) ? ' & ' : ' && ',
                command;

            command = _.map(themes, function(theme, name) {
                return combo.collector(name);
            }).join(cmdPlus);

            return 'echo ' + command;
        }
    }
};

/**
 * Execution into cmd
 */
module.exports = _.extend(themeOptions, execOptions);
