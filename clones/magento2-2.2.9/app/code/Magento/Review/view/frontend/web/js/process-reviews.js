/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/magento-engcom/import-export-improvements/releases/tag/2.3-develop-d1906d8
*    Source File: process-reviews.js
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
    'jquery'
], function ($) {
    'use strict';

    /**
     * @param {String} url
     * @param {*} fromPages
     */
    function processReviews(url, fromPages) {
        $.ajax({
            url: url,
            cache: true,
            dataType: 'html',
            showLoader: false,
            loaderContext: $('.product.data.items')
        }).done(function (data) {
            $('#product-review-container').html(data).trigger('contentUpdated');
            $('[data-role="product-review"] .pages a').each(function (index, element) {
                $(element).click(function (event) { //eslint-disable-line max-nested-callbacks
                    processReviews($(element).attr('href'), true);
                    event.preventDefault();
                });
            });
        }).complete(function () {
            if (fromPages == true) { //eslint-disable-line eqeqeq
                $('html, body').animate({
                    scrollTop: $('#reviews').offset().top - 50
                }, 300);
            }
        });
    }

    return function (config) {
        var reviewTab = $(config.reviewsTabSelector),
            requiredReviewTabRole = 'tab';

        if (reviewTab.attr('role') === requiredReviewTabRole && reviewTab.hasClass('active')) {
            processReviews(config.productReviewUrl);
        } else {
            reviewTab.one('beforeOpen', function () {
                processReviews(config.productReviewUrl);
            });
        }

        $(function () {
            $('.product-info-main .reviews-actions a').click(function (event) {
                var anchor;

                event.preventDefault();
                anchor = $(this).attr('href').replace(/^.*?(#|$)/, '');
                $('.product.data.items [data-role="content"]').each(function (index) { //eslint-disable-line
                    if (this.id == 'reviews') { //eslint-disable-line eqeqeq
                        $('.product.data.items').tabs('activate', index);
                        $('html, body').animate({
                            scrollTop: $('#' + anchor).offset().top - 50
                        }, 300);
                    }
                });
            });
        });
    };
});
