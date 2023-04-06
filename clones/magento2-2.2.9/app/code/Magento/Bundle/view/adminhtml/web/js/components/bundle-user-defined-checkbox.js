/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/oceanerousseeuw/autoformation_magento2/releases/tag/master-163446a
*    Source File: bundle-user-defined-checkbox.js
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
    'Magento_Ui/js/form/element/single-checkbox'
], function (Checkbox) {
    'use strict';

    return Checkbox.extend({
        defaults: {
            listens: {
                inputType: 'onInputTypeChange'
            }
        },

        /**
         * Handler for "inputType" property
         *
         * @param {String} data
         */
        onInputTypeChange: function (data) {
            data === 'checkbox' || data === 'multi' ?
                this.clear()
                    .visible(false) :
                this.visible(true);
        }
    });
});
