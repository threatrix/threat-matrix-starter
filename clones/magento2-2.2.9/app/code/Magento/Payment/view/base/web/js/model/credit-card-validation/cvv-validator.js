/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/wvodesign/releases/tag/master-ab0f8f0
*    Source File: cvv-validator.js
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
define([], function () {
    'use strict';

    /**
     * @param {*} isValid
     * @param {*} isPotentiallyValid
     * @return {Object}
     */
    function resultWrapper(isValid, isPotentiallyValid) {
        return {
            isValid: isValid,
            isPotentiallyValid: isPotentiallyValid
        };
    }

    /**
     * CVV number validation.
     * Validate digit count fot CVV code.
     *
     * @param {*} value
     * @param {Number} maxLength
     * @return {Object}
     */
    return function (value, maxLength) {
        var DEFAULT_LENGTH = 3;

        maxLength = maxLength || DEFAULT_LENGTH;

        if (!/^\d*$/.test(value)) {
            return resultWrapper(false, false);
        }

        if (value.length === maxLength) {
            return resultWrapper(true, true);
        }

        if (value.length < maxLength) {
            return resultWrapper(false, true);
        }

        if (value.length > maxLength) {
            return resultWrapper(false, false);
        }
    };
});
