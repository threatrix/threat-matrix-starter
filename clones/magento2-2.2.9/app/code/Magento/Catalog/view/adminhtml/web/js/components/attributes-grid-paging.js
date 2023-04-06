/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/luke-denton-aligent/magento-pwa/releases/tag/2.3-develop-8acb21f
*    Source File: attributes-grid-paging.js
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
    'Magento_Ui/js/grid/paging/paging',
    'underscore'
], function (Paging, _) {
    'use strict';

    return Paging.extend({
        defaults: {
            totalTmpl: 'Magento_Catalog/attributes/grid/paging',
            modules: {
                selectionColumn: '${ $.selectProvider }'
            },
            listens: {
                '${ $.selectProvider }:selected': 'changeLabel'
            },
            label: '',
            selectedAttrs: []
        },

        /**
         * Change label.
         *
         * @param {Array} selected
         */
        changeLabel: function (selected) {
            this.selectedAttrs = [];
            _.each(this.selectionColumn().rows(), function (row) {
                if (selected.indexOf(row['attribute_id']) !== -1) {
                    this.selectedAttrs.push(row['attribute_code']);
                }
            }, this);

            this.label(this.selectedAttrs.join(', '));
        },

        /** @inheritdoc */
        initObservable: function () {
            this._super()
                .observe('label');

            return this;
        }
    });
});
