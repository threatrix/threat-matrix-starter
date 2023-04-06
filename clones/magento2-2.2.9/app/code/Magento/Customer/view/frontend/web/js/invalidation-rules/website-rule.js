/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/sunilasm/kirana/releases/tag/master-013b6f3
*    Source File: website-rule.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Apache License 2.0
*      SPDXId: Apache-2.0
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
    'uiClass'
], function (Element) {
    'use strict';

    return Element.extend({

        defaults: {
            scopeConfig: {}
        },

        /**
         * Takes website id from current customer data and compare it with current website id
         * If customer belongs to another scope, we need to invalidate current section
         *
         * @param {Object} customerData
         */
        process: function (customerData) {
            var customer = customerData.get('customer');

            if (this.scopeConfig && customer() &&
                ~~customer().websiteId !== ~~this.scopeConfig.websiteId && ~~customer().websiteId !== 0) {
                customerData.reload(['customer']);
            }
        }
    });
});
