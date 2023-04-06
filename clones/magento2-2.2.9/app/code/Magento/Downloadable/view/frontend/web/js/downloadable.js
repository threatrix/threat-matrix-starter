/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/gaugeinteractive/magento-training/releases/tag/develop-137022f
*    Source File: downloadable.js
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
define([
    'jquery',
    'jquery/ui',
    'Magento_Catalog/js/price-box'
], function ($) {
    'use strict';

    $.widget('mage.downloadable', {
        options: {
            priceHolderSelector: '.price-box'
        },

        /** @inheritdoc */
        _create: function () {
            var self = this;

            this.element.find(this.options.linkElement).on('change', $.proxy(function () {
                this._reloadPrice();
            }, this));

            this.element.find(this.options.allElements).on('change', function () {
                if (this.checked) {
                    $('label[for="' + this.id + '"] > span').text($(this).attr('data-checked'));
                    self.element.find(self.options.linkElement + ':not(:checked)').each(function () {
                        $(this).trigger('click');
                    });
                } else {
                    $('[for="' + this.id + '"] > span').text($(this).attr('data-notchecked'));
                    self.element.find(self.options.linkElement + ':checked').each(function () {
                        $(this).trigger('click');
                    });
                }
            });
        },

        /**
         * Reload product price with selected link price included
         * @private
         */
        _reloadPrice: function () {
            var finalPrice = 0,
                basePrice = 0;

            this.element.find(this.options.linkElement + ':checked').each($.proxy(function (index, element) {
                finalPrice += this.options.config.links[$(element).val()].finalPrice;
                basePrice += this.options.config.links[$(element).val()].basePrice;
            }, this));

            $(this.options.priceHolderSelector).trigger('updatePrice', {
                'prices': {
                    'finalPrice': {
                        'amount': finalPrice
                    },
                    'basePrice': {
                        'amount': basePrice
                    }
                }
            });
        }
    });

    return $.mage.downloadable;
});
