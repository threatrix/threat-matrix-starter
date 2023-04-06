/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/victoraugrosa/Magento2MagedInUniversity/releases/tag/master-d8e5202
*    Source File: collapsible.js
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
    'uiComponent'
], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            opened: false,
            collapsible: true
        },

        /**
         * Initializes observable properties.
         *
         * @returns {Collapsible} Chainable.
         */
        initObservable: function () {
            this._super()
                .observe('opened');

            return this;
        },

        /**
         * Toggles value of the 'opened' property.
         *
         * @returns {Collapsible} Chainable.
         */
        toggleOpened: function () {
            this.opened() ?
                this.close() :
                this.open();

            return this;
        },

        /**
         * Sets 'opened' flag to false.
         *
         * @returns {Collapsible} Chainable.
         */
        close: function () {
            if (this.collapsible) {
                this.opened(false);
            }

            return this;
        },

        /**
         * Sets 'opened' flag to true.
         *
         * @returns {Collapsible} Chainable.
         */
        open: function () {
            if (this.collapsible) {
                this.opened(true);
            }

            return this;
        }
    });
});
