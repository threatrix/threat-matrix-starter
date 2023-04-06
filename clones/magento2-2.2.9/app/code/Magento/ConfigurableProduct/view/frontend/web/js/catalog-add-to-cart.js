/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/yandrismatacabrera/magento_24/releases/tag/main-edf6c09
*    Source File: catalog-add-to-cart.js
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
require([
    'jquery'
], function ($) {
    'use strict';

    /**
     * Add selected configurable attributes to redirect url
     *
     * @see Magento_Catalog/js/catalog-add-to-cart
     */
    $('body').on('catalogCategoryAddToCartRedirect', function (event, data) {
        $(data.form).find('select[name*="super"]').each(function (index, item) {
            data.redirectParameters.push(item.config.id + '=' + $(item).val());
        });
    });
});
