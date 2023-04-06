/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/CreateStores/training_test/releases/tag/master-1365734
*    Source File: import-handler.js
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
    'Magento_Ui/js/form/element/abstract',
    'underscore',
    'uiRegistry'
], function (Abstract, _, registry) {
    'use strict';

    return Abstract.extend({
        defaults: {
            allowImport: true,
            autoImportIfEmpty: false,
            values: {},
            mask: '',
            queryTemplate: 'ns = ${ $.ns }, index = '
        },

        /** @inheritdoc */
        initialize: function () {
            this._super();

            if (this.allowImport) {
                this.setHandlers();
            }
        },

        /**
         * Split mask placeholder and attach events to placeholder fields.
         */
        setHandlers: function () {
            var str = this.mask || '',
                placeholders;

            placeholders = str.match(/{{(.*?)}}/g); // Get placeholders

            _.each(placeholders, function (placeholder) {
                placeholder = placeholder.replace(/[{{}}]/g, ''); // Remove curly braces

                registry.get(this.queryTemplate + placeholder, function (component) {
                    this.values[placeholder] = component.getPreview();
                    component.on('value', this.updateValue.bind(this, placeholder, component));
                    component.valueUpdate = 'keyup';
                }.bind(this));
            }, this);
        },

        /**
         * Update field with mask value, if it's allowed.
         *
         * @param {Object} placeholder
         * @param {Object} component
         */
        updateValue: function (placeholder, component) {
            var string = this.mask || '',
                nonEmptyValueFlag = false;

            if (placeholder) {
                this.values[placeholder] = component.getPreview() || '';
            }

            if (!this.allowImport) {
                return;
            }

            _.each(this.values, function (propertyValue, propertyName) {
                string = string.replace('{{' + propertyName + '}}', propertyValue);
                nonEmptyValueFlag = nonEmptyValueFlag || !!propertyValue;
            });

            if (nonEmptyValueFlag) {
                string = string.replace(/(<([^>]+)>)/ig, ''); // Remove html tags
                this.value(string);
            } else {
                this.value('');
            }
        },

        /**
         * Disallow import when initial value isn't empty string
         *
         * @returns {*}
         */
        setInitialValue: function () {
            this._super();

            if (this.initialValue !== '') {
                this.allowImport = false;
            }

            return this;
        },

        /**
         *  Callback when value is changed by user,
         *  and disallow/allow import value
         */
        userChanges: function () {

            /**
             *  As userChanges is called before updateValue,
             *  we forced to get value from component by reference
             */
            var actualValue = arguments[1].currentTarget.value;

            this._super();

            if (actualValue === '') {
                this.allowImport = true;

                if (this.autoImportIfEmpty) {
                    this.updateValue(null, null);
                }
            } else {
                this.allowImport = false;
            }
        }
    });
});
