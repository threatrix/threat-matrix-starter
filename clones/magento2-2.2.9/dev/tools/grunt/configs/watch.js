/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Magestore/devops-magento-2.2.1/releases/tag/master-69f8ef8
*    Source File: watch.js
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

var combo  = require('./combo'),
    themes = require('../tools/files-router').get('themes'),
    _      = require('underscore');

var themeOptions = {};

_.each(themes, function(theme, name) {
    themeOptions[name] = {
        'files': [
            '<%= combo.autopath(\''+name+'\', path.pub) %>/**/*.less'
        ],
        'tasks': 'less:' + name
    };
});

var watchOptions = {
    'setup': {
        'files': '<%= path.less.setup %>/**/*.less',
        'tasks': 'less:setup'
    },
    'updater': {
        'options': {
            livereload: true
        },
        'files': '<%= path.less.updater %>/**/*.less',
        'tasks': 'less:updater'
    },
    'reload': {
        'files': '<%= path.pub %>/**/*.css',
        'options': {
            livereload: true
        }
    }
};

module.exports = _.extend(themeOptions, watchOptions);
