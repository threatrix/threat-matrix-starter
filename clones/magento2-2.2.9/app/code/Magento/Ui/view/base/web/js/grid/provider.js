/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/austin-technology/austin_magento_2/releases/tag/master-f890a0f
*    Source File: provider.js
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

/**
 * @api
 */
define([
    'jquery',
    'underscore',
    'mageUtils',
    'rjsResolver',
    'uiLayout',
    'Magento_Ui/js/modal/alert',
    'mage/translate',
    'uiElement'
], function ($, _, utils, resolver, layout, alert, $t, Element) {
    'use strict';

    return Element.extend({
        defaults: {
            firstLoad: true,
            lastError: false,
            storageConfig: {
                component: 'Magento_Ui/js/grid/data-storage',
                provider: '${ $.storageConfig.name }',
                name: '${ $.name }_storage',
                updateUrl: '${ $.update_url }'
            },
            listens: {
                params: 'onParamsChange',
                requestConfig: 'updateRequestConfig'
            },
            ignoreTmpls: {
                data: true
            }
        },

        /**
         * Initializes provider component.
         *
         * @returns {Provider} Chainable.
         */
        initialize: function () {
            utils.limit(this, 'onParamsChange', 5);
            _.bindAll(this, 'onReload');

            this._super()
                .initStorage()
                .clearData();

            // Load data when there will
            // be no more pending assets.
            resolver(this.reload, this);

            return this;
        },

        /**
         * Initializes storage component.
         *
         * @returns {Provider} Chainable.
         */
        initStorage: function () {
            layout([this.storageConfig]);

            return this;
        },

        /**
         * Clears provider's data properties.
         *
         * @returns {Provider} Chainable.
         */
        clearData: function () {
            this.setData({
                items: [],
                totalRecords: 0
            });

            return this;
        },

        /**
         * Overrides current data with a provided one.
         *
         * @param {Object} data - New data object.
         * @returns {Provider} Chainable.
         */
        setData: function (data) {
            data = this.processData(data);

            this.set('data', data);

            return this;
        },

        /**
         * Processes data before applying it.
         *
         * @param {Object} data - Data to be processed.
         * @returns {Object}
         */
        processData: function (data) {
            var items = data.items;

            _.each(items, function (record, index) {
                record._rowIndex = index;
            });

            return data;
        },

        /**
         * Reloads data with current parameters.
         *
         * @returns {Promise} Reload promise object.
         */
        reload: function (options) {
            var request = this.storage().getData(this.params, options);

            this.trigger('reload');

            request
                .done(this.onReload)
                .fail(this.onError.bind(this));

            return request;
        },

        /**
         * Handles changes of 'params' object.
         */
        onParamsChange: function () {
            // It's necessary to make a reload only
            // after the initial loading has been made.
            if (!this.firstLoad) {
                this.reload();
            }
        },

        /**
         * Handles reload error.
         */
        onError: function (xhr) {
            if (xhr.statusText === 'abort') {
                return;
            }

            this.set('lastError', true);

            this.firstLoad = false;

            alert({
                content: $t('Something went wrong.')
            });
        },

        /**
         * Handles successful data reload.
         *
         * @param {Object} data - Retrieved data object.
         */
        onReload: function (data) {
            this.firstLoad = false;

            this.set('lastError', false);

            this.setData(data)
                .trigger('reloaded');
        },

        /**
         * Updates storage's request configuration
         *
         * @param {Object} requestConfig
         */
        updateRequestConfig: function (requestConfig) {
            if (this.storage()) {
                _.extend(this.storage().requestConfig, requestConfig);
            }
        }
    });
});
