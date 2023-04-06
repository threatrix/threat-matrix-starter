/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/wvodesign/releases/tag/master-ab0f8f0
*    Source File: coupon-type.js
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
    'underscore',
    'uiRegistry',
    'Magento_Ui/js/form/element/select'
], function (_, uiRegistry, select) {
    'use strict';

    return select.extend({

        /**
         * Hide fields on coupon tab
         */
        onUpdate: function () {

            /* eslint-disable eqeqeq */
            if (this.value() != this.displayOnlyForCouponType) {
                uiRegistry.get('sales_rule_form.sales_rule_form.rule_information.use_auto_generation').checked(false);
            }

            this.enableDisableFields();
        },

        /**
         * Enable/disable fields on Coupons tab
         */
        enableDisableFields: function () {
            var selector,
                isUseAutoGenerationChecked,
                couponType,
                disableAuto;

            selector = '[id=sales-rule-form-tab-coupons] input, [id=sales-rule-form-tab-coupons] select, ' +
                    '[id=sales-rule-form-tab-coupons] button';
            isUseAutoGenerationChecked = uiRegistry
                    .get('sales_rule_form.sales_rule_form.rule_information.use_auto_generation')
                    .checked();
            couponType = uiRegistry
                .get('sales_rule_form.sales_rule_form.rule_information.coupon_type')
                .value();
            disableAuto = couponType === 3 || isUseAutoGenerationChecked;
            _.each(
                document.querySelectorAll(selector),
                function (element) {
                    element.disabled = !disableAuto;
                }
            );
        }
    });
});
