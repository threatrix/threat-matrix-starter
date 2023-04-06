/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/marinetechtools/releases/tag/master-eefa26e
*    Source File: additional-validators.js
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
 * @api
 */
define([], function () {
    'use strict';

    var validators = [];

    return {
        /**
         * Register unique validator
         *
         * @param {*} validator
         */
        registerValidator: function (validator) {
            validators.push(validator);
        },

        /**
         * Returns array of registered validators
         *
         * @returns {Array}
         */
        getValidators: function () {
            return validators;
        },

        /**
         * Process validators
         *
         * @returns {Boolean}
         */
        validate: function () {
            var validationResult = true;

            if (validators.length <= 0) {
                return validationResult;
            }

            validators.forEach(function (item) {
                if (item.validate() == false) { //eslint-disable-line eqeqeq
                    validationResult = false;

                    return false;
                }
            });

            return validationResult;
        }
    };
});
