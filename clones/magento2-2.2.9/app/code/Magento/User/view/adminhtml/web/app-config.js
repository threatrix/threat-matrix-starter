/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/CreateStores/training_test/releases/tag/master-1365734
*    Source File: app-config.js
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

/**
 * @deprecated since version 2.2.0
 */
require.config({
    'waitSeconds': 0,
    'shim': {
        'jquery/jquery.hashchange': ['jquery'],
        'jquery/jstree/jquery.hotkeys': ['jquery'],
        'jquery/hover-intent': ['jquery'],
        'mage/adminhtml/backup': ['prototype'],
        'mage/captcha': ['prototype'],
        'mage/common': ['jquery'],
        'mage/webapi': ['jquery'],
        'ko': {
            exports: 'ko'
        },
        'moment': {
            exports: 'moment'
        }
    },
    'paths': {
        'jquery/ui': 'jquery/jquery-ui-1.9.2',
        'jquery/validate': 'jquery/jquery.validate',
        'jquery/hover-intent': 'jquery/jquery.hoverIntent',
        'jquery/file-uploader': 'jquery/fileUploader/jquery.fileupload-fp',
        'jquery/jquery.hashchange': 'jquery/jquery.ba-hashchange.min',
        'prototype': 'prototype/prototype-amd',
        'text': 'requirejs/text',
        'domReady': 'requirejs/domReady',
        'ko': 'ko/ko'
    }
});

require(['jquery'], function (jQuery) {
    'use strict';

    jQuery.noConflict();
});
