/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/K4milo/doble-dos-src/releases/tag/master-19bb57c
*    Source File: spinner.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Apache License 2.0
*      SPDXId: Apache-2.0
*    
*    Auto-attribution by Threatrix, Inc.
*    
*    ------ END LICENSE ATTRIBUTION ------
*/
/**
 * Copyright © Magento, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */

define([
    'jquery'
], function ($) {
    'use strict';

    var selector = '[data-role="spinner"]',
        spinner = $(selector);

    return {
        /**
         * Show spinner.
         */
        show: function () {
            spinner.show();
        },

        /**
         * Hide spinner.
         */
        hide: function () {
            spinner.hide();
        },

        /**
         * Get spinner by selector.
         *
         * @param {String} id
         * @return {jQuery}
         */
        get: function (id) {
            return $(selector + '[data-component="' + id + '"]');
        }
    };
});
