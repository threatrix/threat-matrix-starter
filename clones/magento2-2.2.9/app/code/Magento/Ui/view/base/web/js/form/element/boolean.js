/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/marinetechtools/releases/tag/master-eefa26e
*    Source File: boolean.js
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
    './abstract'
], function (Abstract) {
    'use strict';

    return Abstract.extend({
        defaults: {
            checked: false,
            links: {
                checked: 'value'
            }
        },

        /**
         * @returns {*|void|Element}
         */
        initObservable: function () {
            return this._super()
                    .observe('checked');
        },

        /**
         * Converts provided value to boolean.
         *
         * @returns {Boolean}
         */
        normalizeData: function () {
            return !!+this._super();
        },

        /**
         * Calls 'onUpdate' method of parent, if value is defined and instance's
         *     'unique' property set to true, calls 'setUnique' method
         *
         * @return {Object} - reference to instance
         */
        onUpdate: function () {
            if (this.hasUnique) {
                this.setUnique();
            }

            return this._super();
        }
    });
});
