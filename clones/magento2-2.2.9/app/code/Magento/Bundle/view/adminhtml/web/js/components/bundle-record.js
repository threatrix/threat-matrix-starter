/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/asheesh2016/magento1/releases/tag/master-3f3919e
*    Source File: bundle-record.js
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
    'Magento_Ui/js/dynamic-rows/record',
    'uiRegistry'
], function (Record, registry) {
    'use strict';

    return Record.extend({
        /**
         * @param {String} val - type of Input Type
         */
        onTypeChanged: function (val) {
            var columnVisibility  = !(val === 'multi' || val === 'checkbox');

            registry.async(this.name + '.' + 'selection_can_change_qty')(function (elem) {
                elem.visible(columnVisibility);
            });
        }
    });
});
