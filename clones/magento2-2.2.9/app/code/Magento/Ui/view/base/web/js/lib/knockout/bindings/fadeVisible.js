/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fred18/zaidiart_dev/releases/tag/master-d836de4
*    Source File: fadeVisible.js
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

define([
    'jquery',
    'ko'
], function ($, ko) {
    'use strict';

    ko.bindingHandlers.fadeVisible = {
        /**
         * Initially set the element to be instantly visible/hidden depending on the value.
         *
         * @param {HTMLElement} element
         * @param {Function} valueAccessor
         */
        init: function (element, valueAccessor) {
            var value = valueAccessor();

            // Use "unwrapObservable" so we can handle values that may or may not be observable
            $(element).toggle(ko.unwrap(value));
        },

        /**
         * Whenever the value subsequently changes, slowly fade the element in or out.
         *
         * @param {HTMLElement} element
         * @param {Function} valueAccessor
         */
        update: function (element, valueAccessor) {
            var value = valueAccessor();

            ko.unwrap(value) ? $(element).fadeIn() : $(element).fadeOut();
        }
    };
});
