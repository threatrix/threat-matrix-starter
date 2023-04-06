/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/ZeeshanShafiq1161/testproject/releases/tag/master-ff34526
*    Source File: iframe.js
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
define([
    'uiComponent',
    'ko',
    'Magento_Paypal/js/model/iframe'
], function (Component, ko, iframe) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_Paypal/review/actions/iframe'
        },

        /**
         * @return {*}
         */
        getCode: function () {
            return this.index;
        },

        /**
         * @return {String}
         */
        getActionUrl: function () {
            return this.isInAction() ? window.checkoutConfig.payment.paypalIframe.actionUrl[this.getCode()] : '';
        },

        /**
         * @return {Boolean}
         */
        afterSave: function () {
            iframe.setIsInAction(true);

            return false;
        },

        /**
         * @return {*}
         */
        isInAction: function () {
            return iframe.getIsInAction()();
        },

        /**
         * @param {Object} context
         * @return {Function}
         */
        placeOrder: function (context) {
            return context.placeOrder.bind(context, this.afterSave);
        }
    });
});
