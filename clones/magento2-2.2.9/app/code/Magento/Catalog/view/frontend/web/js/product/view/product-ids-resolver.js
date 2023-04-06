/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/vhrytsuk/zevsi/releases/tag/master-120066b
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
    'underscore',
    'Magento_Catalog/js/product/view/product-ids'
], function (_, productIds) {
    'use strict';

    /**
     * Returns id's of products in form.
     *
     * @param {jQuery} $form
     * @return {Array}
     */
    return function ($form) {
        var idSet = productIds(),
            product = _.findWhere($form.serializeArray(), {
            name: 'product'
        });

        if (!_.isUndefined(product)) {
            idSet.push(product.value);
        }

        return _.uniq(idSet);
    };
});
