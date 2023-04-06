/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/sunilasm/kirana/releases/tag/master-013b6f3
*    Source File: image-size-field.js
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
    'Magento_Ui/js/lib/validation/utils',
    'Magento_Ui/js/form/element/abstract',
    'Magento_Ui/js/lib/validation/validator',
    'mage/translate'
], function ($, utils, Abstract, validator) {
    'use strict';

    validator.addRule(
        'validate-image-size-range',
        function (value) {
            var dataAttrRange = /^(\d+)x(\d+)$/,
                m;

            if (utils.isEmptyNoTrim(value)) {
                return true;
            }

            m = dataAttrRange.exec(value);

            return !!(m &&  m[1] > 0 && m[2] > 0);
        },
        $.mage.__('This value does not follow the specified format (for example, 200x300).')
    );

    return Abstract.extend({

        /**
         * Checks for relevant value
         *
         * @returns {Boolean}
         */
        isRangeCorrect: function () {
            return validator('validate-image-size-range', this.value()).passed;
        }
    });
});
