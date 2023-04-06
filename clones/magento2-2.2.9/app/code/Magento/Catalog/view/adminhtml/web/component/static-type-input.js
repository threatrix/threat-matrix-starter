/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fred18/zaidiart_dev/releases/tag/master-d836de4
*    Source File: static-type-input.js
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
    'uiRegistry',
    'Magento_Ui/js/form/element/abstract'
], function (registry, Abstract) {
    'use strict';

    return Abstract.extend({
        defaults: {
            parentOption: null
        },

        /**
         * Initialize component.
         *
         * @returns {Element}
         */
        initialize: function () {
            return this
                ._super()
                .initLinkToParent();
        },

        /**
         * Cache link to parent component - option holder.
         *
         * @returns {Element}
         */
        initLinkToParent: function () {
            var pathToParent = this.parentName.replace(/(\.[^.]*){2}$/, '');

            this.parentOption = registry.async(pathToParent);
            this.value() && this.parentOption('label', this.value());

            return this;
        },

        /**
         * On value change handler.
         *
         * @param {String} value
         */
        onUpdate: function (value) {
            this.parentOption(function (component) {
                component.set('label', value ? value : component.get('headerLabel'));
            });

            return this._super();
        }
    });
});
