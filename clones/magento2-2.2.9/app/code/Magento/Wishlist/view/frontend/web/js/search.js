/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/understood72/mage2/releases/tag/master-efdcb9c
*    Source File: search.js
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
    'jquery/ui'
], function ($) {
    'use strict';

    $.widget('mage.wishlistSearch', {

        /**
         * Bind handlers to events
         */
        _create: function () {
            this.element.on('change', $.proxy(this._toggleForm, this));
        },

        /**
         * Toggle Form
         * @private
         */
        _toggleForm: function () {
            switch (this.element.val()) {
                case 'name':
                    $(this.options.emailFormSelector).hide();
                    $(this.options.nameFormSelector).show();
                    break;

                case 'email':
                    $(this.options.nameFormSelector).hide();
                    $(this.options.emailFormSelector).show();
                    break;
                default:
                    $(this.options.emailFormSelector).add(this.options.nameFormSelector).hide();
            }
        }
    });

    return $.mage.wishlistSearch;
});
