/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Magestore/devops-magento-2.2.1/releases/tag/master-69f8ef8
*    Source File: attributes-fieldset.js
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
    'Magento_Ui/js/form/components/fieldset',
    'Magento_Ui/js/core/app'
], function (Fieldset, app) {
    'use strict';

    return Fieldset.extend({
        defaults: {
            listens: {
                '${ $.provider }:additionalAttributes': 'onAttributeAdd'
            }
        },

        /**
         * On attribute add trigger
         *
         * @param {Object} listOfNewAttributes
         */
        onAttributeAdd: function (listOfNewAttributes) {
            app(listOfNewAttributes, true);
        }
    });
});
