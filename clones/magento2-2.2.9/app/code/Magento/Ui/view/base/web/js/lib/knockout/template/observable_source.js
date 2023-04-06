/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/cqsang97/magento2/releases/tag/master-5f7986b
*    Source File: observable_source.js
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
 * Is being used by knockout template engine to store template to.
 */
define([
    'ko',
    'uiClass'
], function (ko, Class) {
    'use strict';

    return Class.extend({

        /**
         * Initializes templateName, _data, nodes properties.
         *
         * @param  {template} template - identifier of template
         */
        initialize: function (template) {
            this.templateName = template;
            this._data = {};
            this.nodes = ko.observable([]);
        },

        /**
         * Data setter. If only one arguments passed, returns corresponding value.
         * Else, writes into it.
         * @param  {String} key - key to write to or to read from
         * @param  {*} value
         * @return {*} - if 1 arg provided, returnes _data[key] property
         */
        data: function (key, value) {
            if (arguments.length === 1) {
                return this._data[key];
            }

            this._data[key] = value;
        }
    });
});
