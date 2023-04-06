/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/pramodkharade/Magento2/releases/tag/master-3a5fa74
*    Source File: dynamic-rows-import-custom-options.js
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
    'Magento_Ui/js/dynamic-rows/dynamic-rows-grid',
    'underscore',
    'mageUtils'
], function (DynamicRows, _, utils) {
    'use strict';

    return DynamicRows.extend({
        defaults: {
            mappingSettings: {
                enabled: false,
                distinct: false
            },
            update: true,
            map: {
                'option_id': 'option_id'
            },
            identificationProperty: 'option_id',
            identificationDRProperty: 'option_id'
        },

        /** @inheritdoc */
        processingInsertData: function (data) {
            var options = [],
                currentOption,
                generalContext = this;

            if (!data) {
                return;
            }
            _.each(data, function (item) {
                if (!item.options) {
                    return;
                }
                _.each(item.options, function (option) {
                    currentOption = utils.copy(option);

                    if (currentOption.hasOwnProperty('sort_order')) {
                        delete currentOption['sort_order'];
                    }

                    if (currentOption.hasOwnProperty('option_id')) {
                        delete currentOption['option_id'];
                    }

                    if (currentOption.values.length > 0) {
                        generalContext.removeOptionsIds(currentOption.values);
                    }
                    options.push(currentOption);
                });
            });

            if (!options.length) {
                return;
            }
            this.cacheGridData = options;
            _.each(options, function (opt) {
                this.mappingValue(opt);
            }, this);

            this.insertData([]);
        },

        /**
         * Removes option_id and option_type_id from every option
         *
         * @param {Array} options
         */
        removeOptionsIds: function (options) {
            _.each(options, function (optionValue) {
                delete optionValue['option_id'];
                delete optionValue['option_type_id'];
            });
        },

        /** @inheritdoc */
        processingAddChild: function (ctx, index, prop) {
            if (!ctx) {
                this.showSpinner(true);
                this.addChild(ctx, index, prop);

                return;
            }

            this._super(ctx, index, prop);
        },

        /**
         * Set empty array to dataProvider
         */
        clearDataProvider: function () {
            this.source.set(this.dataProvider, []);
        },

        /**
         * Mutes parent method
         */
        updateInsertData: function () {
            return false;
        }
    });
});
