/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Lavaret/MagentoOne/releases/tag/master-813d813
*    Source File: upsell-products.js
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
    'jquery/ui'
], function ($) {
    'use strict';

    $.widget('mage.upsellProducts', {
        options: {
            elementsSelector: '.item.product'
        },

        /**
         * Bind events to the appropriate handlers.
         * @private
         */
        _create: function () {
            this._showUpsellProducts(
                this.element.find(this.options.elementsSelector),
                this.element.data('limit'),
                this.element.data('shuffle')
            );
        },

        /**
         * Show upsell products according to limit. Shuffle if needed.
         * @param {*} elements
         * @param {Number} limit
         * @param {Boolean} shuffle
         * @private
         */
        _showUpsellProducts: function (elements, limit, shuffle) {
            var index;

            if (shuffle) {
                this._shuffle(elements);
            }

            if (limit === 0) {
                limit = elements.length;
            }

            for (index = 0; index < limit; index++) {
                $(this.element).find(elements[index]).show();
            }
        },

        /* jscs:disable */
        /* eslint-disable */
        /**
         * Shuffle an array
         * @param o
         * @returns {*}
         */
        _shuffle: function shuffle(o){ //v1.0
            for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }

        /* jscs:disable */
        /* eslint:disable */
    });

    return $.mage.upsellProducts;
});
