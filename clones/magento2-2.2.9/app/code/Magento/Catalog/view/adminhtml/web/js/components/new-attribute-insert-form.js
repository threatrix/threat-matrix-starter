/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/magento-2/magento-2-community-sample-data/releases/tag/2.1.16
*    Source File: new-attribute-insert-form.js
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
    'Magento_Ui/js/form/components/insert-form'
], function (InsertForm) {
    'use strict';

    return InsertForm.extend({
        defaults: {
            modules: {
                productForm: 'product_form.product_form'
            },
            listens: {
                responseStatus: 'processResponseStatus'
            },
            attributeSetId: 0,
            productId: 0
        },

        /**
         * Process response status.
         */
        processResponseStatus: function () {
            if (this.responseStatus()) {

                if (this.productForm().params === undefined) {
                    this.productForm().params = {
                        set: this.attributeSetId
                    };
                }

                if (this.productId) {
                    this.productForm().params.id = this.productId;
                }
                this.productForm().params.type = this.productType;

                this.productForm().reload();
                this.resetForm();
            }
        }
    });
});
