/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/SodHub/M2/releases/tag/master-0705dfd
*    Source File: file-type-field.js
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

        /**
         * Checks is relevant value
         *
         * @param {String} value
         * @returns {Boolean}
         */
        isRelevant: function (value) {
            if (value === 'file') {
                this.disabled(false);
                this.visible(true);

                return true;
            }

            this.reset();
            this.disabled(true);
            this.visible(false);

            return false;
        }
    });
});
