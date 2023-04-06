/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/AlexBlackRu/magento23/releases/tag/master-c98b3a7
*    Source File: product-ids-resolver.js
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
    'Magento_Catalog/js/product/view/product-ids'
], function ($, productIds) {
    'use strict';

    /**
     * Returns id's of products in form.
     *
     * @param {Object} config
     * @param {HTMLElement} element
     * @return {Array}
     */
    return function (config, element) {
        $(element).find('div[data-product-id]').each(function () {
            productIds.push($(this).data('productId').toString());
        });

        return productIds();
    };
});
