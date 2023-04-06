/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/magento-2/magento-2-community/releases/tag/2.3.0
*    Source File: bundle-option-qty.js
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
    'Magento_Ui/js/form/element/abstract'
], function (Abstract) {
    'use strict';

    return Abstract.extend({
        defaults: {
            valueUpdate: 'input',
            isInteger: true,
            validation: {
                'validate-number': true
            }
        },

        /**
         * @inheritdoc
         */
        onUpdate: function () {
            this.validation['validate-digits'] = this.isInteger;
            this._super();
        },

        /**
         * @inheritdoc
         */
        hasChanged: function () {
            var notEqual = this.value() !== this.initialValue.toString();

            return !this.visible() ? false : notEqual;
        }

    });
});
