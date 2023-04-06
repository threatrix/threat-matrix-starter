/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/understood72/mage2/releases/tag/master-efdcb9c
*    Source File: static-type-container.js
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
    'Magento_Ui/js/form/components/group'
], function ($, Group) {
    'use strict';

    return Group.extend({

        /**
         * Checks is relevant value
         *
         * @param {String} value
         * @returns {Boolean}
         */
        isRelevant: function (value) {
            if ($.inArray(value, ['field', 'area', 'file', 'date', 'date_time', 'time']) !== -1) {
                this.visible(true);

                return true;
            }

            this.visible(false);

            return false;
        }
    });
});
