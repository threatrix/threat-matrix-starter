/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Lavaret/MagentoOne/releases/tag/master-813d813
*    Source File: list.js
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

    $.widget('mage.compareList', {

        /** @inheritdoc */
        _create: function () {
            var elem = this.element,
                products = $('thead td', elem),
                headings;

            if (products.length > this.options.productsInRow) {
                headings = $('<table/>')
                    .addClass('comparison headings data table')
                    .insertBefore(elem.closest('.container'));

                elem.addClass('scroll');

                $('th', elem).each(function () {
                    var th = $(this),
                        thCopy = th.clone();

                    th.animate({
                        top: '+=0'
                    }, 50, function () {
                        var height = th.height();

                        thCopy.css('height', height)
                            .appendTo(headings)
                            .wrap('<tr />');
                    });
                });
            }

            $(this.options.windowPrintSelector).on('click', function (e) {
                e.preventDefault();
                window.print();
            });
        }
    });

    return $.mage.compareList;
});
