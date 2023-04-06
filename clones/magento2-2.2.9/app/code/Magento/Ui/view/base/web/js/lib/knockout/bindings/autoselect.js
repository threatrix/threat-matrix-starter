/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Shreeraj31/magento2_paypal/releases/tag/master-abf35e4
*    Source File: autoselect.js
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
    'ko',
    'jquery',
    '../template/renderer'
], function (ko, $, renderer) {
    'use strict';

    /**
     * 'Focus' event handler.
     *
     * @param {EventObject} e
     */
    function onFocus(e) {
        e.target.select();
    }

    ko.bindingHandlers.autoselect = {

        /**
         * Adds event handler which automatically
         * selects inputs' element text when field gets focused.
         */
        init: function (element, valueAccessor) {
            var enabled = ko.unwrap(valueAccessor());

            if (enabled !== false) {
                $(element).on('focus', onFocus);
            }
        }
    };

    renderer.addAttribute('autoselect');
});
