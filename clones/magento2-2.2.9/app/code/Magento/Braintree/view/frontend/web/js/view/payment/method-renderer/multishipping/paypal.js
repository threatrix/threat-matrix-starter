/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://github.com/magento/magento2
*    Release: https://github.com/magento/graphql-ce/releases/tag/2.2.9
*    Source File: paypal.js
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
    'Magento_Braintree/js/view/payment/method-renderer/paypal',
    'Magento_Checkout/js/action/set-payment-information',
    'Magento_Checkout/js/model/payment/additional-validators',
    'Magento_Checkout/js/model/full-screen-loader',
    'mage/translate'
], function (
    $,
    _,
    Component,
    setPaymentInformationAction,
    additionalValidators,
    fullScreenLoader,
    $t
) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Braintree/payment/multishipping/paypal',
            submitButtonSelector: '#payment-continue span'
        },

        /**
         * @override
         */
        onActiveChange: function (isActive) {
            this.updateSubmitButtonTitle(isActive);

            this._super(isActive);
        },

        /**
         * @override
         */
        beforePlaceOrder: function (data) {
            this._super(data);

            this.updateSubmitButtonTitle(true);
        },

        /**
         * @override
         */
        getShippingAddress: function () {
            return {};
        },

        /**
         * @override
         */
        getData: function () {
            var data = this._super();

            data['additional_data']['is_active_payment_token_enabler'] = true;

            return data;
        },

        /**
         * @override
         */
        isActiveVault: function () {
            return true;
        },

        /**
         * Skipping order review step on checkout with multiple addresses is not allowed.
         *
         * @returns {Boolean}
         */
        isSkipOrderReview: function () {
            return false;
        },

        /**
         * Checks if payment method nonce is already received.
         *
         * @returns {Boolean}
         */
        isPaymentMethodNonceReceived: function () {
            return this.paymentMethodNonce !== null;
        },

        /**
         * Updates submit button title on multi-addresses checkout billing form.
         *
         * @param {Boolean} isActive
         */
        updateSubmitButtonTitle: function (isActive) {
            var title = this.isPaymentMethodNonceReceived() || !isActive ?
                $t('Go to Review Your Order') : $t('Continue to PayPal');

            $(this.submitButtonSelector).html(title);
        },

        /**
         * @override
         */
        placeOrder: function () {
            if (!this.isPaymentMethodNonceReceived()) {
                this.payWithPayPal();
            } else {
                fullScreenLoader.startLoader();

                $.when(
                    setPaymentInformationAction(
                        this.messageContainer,
                        this.getData()
                    )
                ).done(this.done.bind(this))
                    .fail(this.fail.bind(this));
            }
        },

        /**
         * {Function}
         */
        fail: function () {
            fullScreenLoader.stopLoader();

            return this;
        },

        /**
         * {Function}
         */
        done: function () {
            fullScreenLoader.stopLoader();
            $('#multishipping-billing-form').submit();

            return this;
        }
    });
});
