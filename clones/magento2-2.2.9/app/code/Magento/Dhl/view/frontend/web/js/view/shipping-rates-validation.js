/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/lindomarcb/Magento-2/releases/tag/master-bd21871
*    Source File: shipping-rates-validation.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Open Software License 3.0
*      SPDXId: OSL-3.0
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
    'uiComponent',
    'Magento_Checkout/js/model/shipping-rates-validator',
    'Magento_Checkout/js/model/shipping-rates-validation-rules',
    'Magento_Dhl/js/model/shipping-rates-validator',
    'Magento_Dhl/js/model/shipping-rates-validation-rules'
], function (
    Component,
    defaultShippingRatesValidator,
    defaultShippingRatesValidationRules,
    dhlShippingRatesValidator,
    dhlShippingRatesValidationRules
) {
    'use strict';

    defaultShippingRatesValidator.registerValidator('dhl', dhlShippingRatesValidator);
    defaultShippingRatesValidationRules.registerRules('dhl', dhlShippingRatesValidationRules);

    return Component;
});
