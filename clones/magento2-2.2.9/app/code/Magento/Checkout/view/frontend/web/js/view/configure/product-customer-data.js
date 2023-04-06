/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fascinosum/magento2/releases/tag/2.3.1
*    Source File: product-customer-data.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*      copyright (c) 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modificati
*      copyright © 2005 lawrence rosen. permission is granted to copy, distribute, or communicate this license without modification
*      copyright (c) 2007, parakey inc
*      copyright 2017 smartbear software
*      copyright year from 2017 to 2018. (by @bhargavmehta)
*      copyright (c) 1991, 1999 free software foundation, inc
*      (c) 2010-2014 google, inc. http://angularjs.org
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
require([
    'jquery',
    'Magento_Customer/js/customer-data',
    'underscore',
    'domReady!'
], function ($, customerData, _) {
    'use strict';

    var selectors = {
        qtySelector: '#product_addtocart_form [name="qty"]',
        productIdSelector: '#product_addtocart_form [name="product"]',
        itemIdSelector: '#product_addtocart_form [name="item"]'
    },
    cartData = customerData.get('cart'),
    productId = $(selectors.productIdSelector).val(),
    itemId = $(selectors.itemIdSelector).val(),
    productQty,
    productQtyInput,

    /**
    * Updates product's qty input value according to actual data
    */
    updateQty = function () {

        if (productQty || productQty === 0) {
            productQtyInput = productQtyInput || $(selectors.qtySelector);

            if (productQtyInput && productQty.toString() !== productQtyInput.val()) {
                productQtyInput.val(productQty);
            }
        }
    },

    /**
    * Sets productQty according to cart data from customer-data
    *
    * @param {Object} data - cart data from customer-data
    */
    setProductQty = function (data) {
        var product;

        if (!(data && data.items && data.items.length && productId)) {
            return;
        }
        product = _.find(data.items, function (item) {
            if (item['item_id'] === itemId) {
                return item['product_id'] === productId ||
                    item['item_id'] === productId;
            }
        });

        if (!product) {
            return;
        }
        productQty = product.qty;
    };

    cartData.subscribe(function (updateCartData) {
        setProductQty(updateCartData);
        updateQty();
    });

    setProductQty(cartData());
    updateQty();
});
