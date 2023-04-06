/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/uzair90/versatbales/releases/tag/master-ac9070b
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
    'underscore',
    'uiElement',
    './client',
    'mageUtils'
], function (_, Element, Client, utils) {
    'use strict';

    return Element.extend({
        defaults: {
            clientConfig: {
                urls: {
                    save: '${ $.submit_url }',
                    beforeSave: '${ $.validate_url }'
                }
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
            this._super()
                .initClient();

            return this;
        },

        /**
         * Initializes client component.
         *
         * @returns {Provider} Chainable.
         */
        initClient: function () {
            this.client = new Client(this.clientConfig);

            return this;
        },

        /**
         * Saves currently available data.
         *
         * @param {Object} [options] - Addtitional request options.
         * @returns {Provider} Chainable.
         */
        save: function (options) {
            var data = this.get('data');

            this.client.save(data, options);

            return this;
        },

        /**
         * Update data that stored in provider.
         *
         * @param {Boolean} isProvider
         * @param {Object} newData
         * @param {Object} oldData
         *
         * @returns {Provider}
         */
        updateConfig: function (isProvider, newData, oldData) {
            if (isProvider === true) {
                this.setData(oldData, newData, this);
            }

            return this;
        },

        /**
         *  Set data to provder based on current data.
         *
         * @param {Object} oldData
         * @param {Object} newData
         * @param {Provider} current
         * @param {String} parentPath
         */
        setData: function (oldData, newData, current, parentPath) {
            _.each(newData, function (val, key) {
                if (_.isObject(val) || _.isArray(val)) {
                    this.setData(oldData[key], val, current[key], utils.fullPath(parentPath, key));
                } else if (val != oldData[key] && oldData[key] == current[key]) {//eslint-disable-line eqeqeq
                    this.set(utils.fullPath(parentPath, key), val);
                }
            }, this);
        }
    });
});
