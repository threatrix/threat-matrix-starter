/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Magestore/devops-magento-2.2.1/releases/tag/master-69f8ef8
*    Source File: sizes.js
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
    'Magento_Ui/js/grid/paging/sizes'
], function (Sizes) {
    'use strict';

    return Sizes.extend({
        defaults: {
            excludedOptions: ['100', '200']
        },

        /**
         * @override
         */
        initialize: function () {
            this._super();

            this.excludedOptions.forEach(function (excludedOption) {
                delete this.options[excludedOption];
            }, this);
            this.updateArray();

            return this;
        }
    });
});
