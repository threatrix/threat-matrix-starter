/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/singharti/08-07-19/releases/tag/master-8dcb0b8
*    Source File: static-type-select.js
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
    'jquery',
    'Magento_Ui/js/form/element/select'
], function ($, Abstract) {
    'use strict';

    return Abstract.extend({

        /**
         * Checks is relevant value
         *
         * @param {String} value
         * @returns {Boolean}
         */
        isRelevant: function (value) {
            if (!value || $.inArray(value, ['drop_down', 'radio', 'checkbox', 'multiple']) !== -1) {
                this.reset();
                this.disabled(true);

                return false;
            }

            this.disabled(false);

            return true;
        }
    });
});
