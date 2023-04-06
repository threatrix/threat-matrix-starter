/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/tguckenberger/magentoIOStation/releases/tag/master-20c73eb
*    Source File: checkmo-method.js
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
    'Magento_Checkout/js/view/payment/default'
], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            template: 'Magento_OfflinePayments/payment/checkmo'
        },

        /**
         * Returns send check to info.
         *
         * @return {*}
         */
        getMailingAddress: function () {
            return window.checkoutConfig.payment.checkmo.mailingAddress;
        },

        /**
         * Returns payable to info.
         *
         * @return {*}
         */
        getPayableTo: function () {
            return window.checkoutConfig.payment.checkmo.payableTo;
        }
    });
});
