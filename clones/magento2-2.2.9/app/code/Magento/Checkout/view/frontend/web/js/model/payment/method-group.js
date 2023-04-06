/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/K4milo/doble-dos-src/releases/tag/master-19bb57c
*    Source File: method-group.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Apache License 2.0
*      SPDXId: Apache-2.0
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
        'uiElement',
        'mage/translate'
], function (Element, $t) {
    'use strict';

    var DEFAULT_GROUP_ALIAS = 'default';

    return Element.extend({
        defaults: {
            alias: DEFAULT_GROUP_ALIAS,
            title: $t('Payment Method'),
            sortOrder: 100,
            displayArea: 'payment-methods-items-${ $.alias }'
        },

        /**
         * Checks if group instance is default
         *
         * @returns {Boolean}
         */
        isDefault: function () {
            return this.alias === DEFAULT_GROUP_ALIAS;
        }
    });
});
