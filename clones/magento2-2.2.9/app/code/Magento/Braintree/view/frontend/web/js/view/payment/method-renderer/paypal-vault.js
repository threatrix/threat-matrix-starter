/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/marinetechtools/releases/tag/master-eefa26e
*    Source File: paypal-vault.js
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
/*browser:true*/
/*global define*/
define([
    'jquery',
    'underscore',
    'Magento_Vault/js/view/payment/method-renderer/vault',
    'Magento_Ui/js/model/messageList',
    'Magento_Checkout/js/model/full-screen-loader'
], function ($, _, VaultComponent, globalMessageList, fullScreenLoader) {
    'use strict';

    return VaultComponent.extend({
        defaults: {
            template: 'Magento_Braintree/payment/paypal/vault',
            additionalData: {}
        },

        /**
         * Get PayPal payer email
         * @returns {String}
         */
        getPayerEmail: function () {
            return this.details.payerEmail;
        },

        /**
         * Get type of payment
         * @returns {String}
         */
        getPaymentIcon: function () {
            return window.checkoutConfig.payment['braintree_paypal'].paymentIcon;
        },

        /**
         * Place order
         */
        beforePlaceOrder: function () {
            this.getPaymentMethodNonce();
        },

        /**
         * Send request to get payment method nonce
         */
        getPaymentMethodNonce: function () {
            var self = this;

            fullScreenLoader.startLoader();
            $.getJSON(self.nonceUrl, {
                'public_hash': self.publicHash
            })
                .done(function (response) {
                    fullScreenLoader.stopLoader();
                    self.additionalData['payment_method_nonce'] = response.paymentMethodNonce;
                    self.placeOrder();
                })
                .fail(function (response) {
                    var error = JSON.parse(response.responseText);

                    fullScreenLoader.stopLoader();
                    globalMessageList.addErrorMessage({
                        message: error.message
                    });
                });
        },

        /**
         * Get payment method data
         * @returns {Object}
         */
        getData: function () {
            var data = {
                'method': this.code,
                'additional_data': {
                    'public_hash': this.publicHash
                }
            };

            data['additional_data'] = _.extend(data['additional_data'], this.additionalData);

            return data;
        }
    });
});
