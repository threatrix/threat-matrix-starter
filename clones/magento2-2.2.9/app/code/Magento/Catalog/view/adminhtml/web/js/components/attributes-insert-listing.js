/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/coolJenny/ma_demo/releases/tag/master-b924437
*    Source File: attributes-insert-listing.js
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
    'Magento_Ui/js/lib/view/utils/async',
    'uiRegistry',
    'underscore',
    'Magento_Ui/js/form/components/insert-listing'
], function ($, registry, _, InsertListing) {
    'use strict';

    return InsertListing.extend({
        defaults: {
            addAttributeUrl: '',
            attributeSetId: '',
            attributeIds: '',
            groupCode: '',
            groupName: '',
            groupSortOrder: 0,
            productId: 0,
            formProvider: '',
            modules: {
                form: '${ $.formProvider }',
                modal: '${ $.parentName }'
            },
            productType: ''
        },

        /**
         * Render attribute
         */
        render: function () {
            this._super();
        },

        /**
         * Save attribute
         */
        save: function () {
            this.addSelectedAttributes();
            this._super();
        },

        /**
         * Add selected attributes
         */
        addSelectedAttributes: function () {
            $.ajax({
                url: this.addAttributeUrl,
                type: 'POST',
                dataType: 'json',
                data: {
                    attributeIds: this.selections().getSelections(),
                    templateId: this.attributeSetId,
                    groupCode: this.groupCode,
                    groupName: this.groupName,
                    groupSortOrder: this.groupSortOrder,
                    productId: this.productId,
                    componentJson: 1
                },
                success: function () {
                    this.form().params = {
                        set: this.attributeSetId,
                        id: this.productId,
                        type: this.productType
                    };
                    this.form().reload();
                    this.modal().state(false);
                    this.reload();
                }.bind(this)
            });
        }
    });
});
