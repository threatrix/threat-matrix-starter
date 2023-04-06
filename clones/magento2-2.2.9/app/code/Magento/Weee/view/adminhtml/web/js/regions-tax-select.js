/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/SodHub/M2/releases/tag/master-0705dfd
*    Source File: regions-tax-select.js
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
    'Magento_Ui/js/form/element/select'
], function (Select) {
    'use strict';

    return Select.extend({
        defaults: {
            filterBy: {
                field: 'country',
                target: '${ $.parentName }.country:value'
            }
        },

        /** @inheritdoc */
        filter: function () {
            this._super();
            this.disableSelect();
        },

        /**
         * Disables select if there's no regions/states
         *
         * @returns {*} instance - Chainable
         */
        disableSelect: function () {
            var empty = !this.options().length;

            this.disabled(empty);

            if (empty) {
                this.error('');
            }

            return this;
        }
    });
});
