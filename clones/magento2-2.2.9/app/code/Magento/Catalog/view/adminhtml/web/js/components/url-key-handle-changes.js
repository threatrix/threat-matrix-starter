/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/mvnp/Magento-2-Com-Banco-de-Dados/releases/tag/master-f15566d
*    Source File: url-key-handle-changes.js
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
 * @api
 */
define([
    'Magento_Ui/js/form/element/single-checkbox'
], function (Checkbox) {
    'use strict';

    return Checkbox.extend({
        defaults: {
            imports: {
                handleUseDefault: '${ $.parentName }.use_default.url_key:checked',
                urlKey: '${ $.provider }:data.url_key'
            },
            listens: {
                urlKey: 'handleChanges'
            },
            modules: {
                useDefault: '${ $.parentName }.use_default.url_key'
            }
        },

        /**
         * Disable checkbox field, when 'url_key' field without changes or 'use default' field is checked
         */
        handleChanges: function (newValue) {
            this.disabled(newValue === this.valueMap['true'] || this.useDefault.checked);
        },

        /**
         * Disable checkbox field, when 'url_key' field without changes or 'use default' field is checked
         */
        handleUseDefault: function (checkedUseDefault) {
            this.disabled(this.urlKey === this.valueMap['true'] || checkedUseDefault);
        }
    });
});
