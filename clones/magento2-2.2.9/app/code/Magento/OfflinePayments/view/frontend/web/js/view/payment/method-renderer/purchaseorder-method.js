/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/123-sanjay/azurepipelines/releases/tag/master-b2314a7
*    Source File: purchaseorder-method.js
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

/* @api */
define([
    'Magento_Checkout/js/view/payment/default',
    'jquery',
    'mage/validation'
], function (Component, $) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_OfflinePayments/payment/purchaseorder-form',
            purchaseOrderNumber: ''
        },

        /** @inheritdoc */
        initObservable: function () {
            this._super()
                .observe('purchaseOrderNumber');

            return this;
        },

        /**
         * @return {Object}
         */
        getData: function () {
            return {
                method: this.item.method,
                'po_number': this.purchaseOrderNumber(),
                'additional_data': null
            };
        },

        /**
         * @return {jQuery}
         */
        validate: function () {
            var form = 'form[data-role=purchaseorder-form]';

            return $(form).validation() && $(form).validation('isValid');
        }
    });
});
