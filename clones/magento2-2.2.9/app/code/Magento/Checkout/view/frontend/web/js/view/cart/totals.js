/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/K4milo/doble-dos-src/releases/tag/master-19bb57c
*    Source File: totals.js
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
    'jquery',
    'uiComponent',
    'Magento_Checkout/js/model/totals',
    'Magento_Checkout/js/model/shipping-service'
], function ($, Component, totalsService, shippingService) {
    'use strict';

    return Component.extend({
        isLoading: totalsService.isLoading,

        /**
         * @override
         */
        initialize: function () {
            this._super();
            totalsService.totals.subscribe(function () {
                $(window).trigger('resize');
            });
            shippingService.getShippingRates().subscribe(function () {
                $(window).trigger('resize');
            });
        }
    });
});
