/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/jiachao-zhang/Magento2-Commerce/releases/tag/V1.1
*    Source File: messages.js
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
    'Magento_Ui/js/form/components/html'
], function (Html) {
    'use strict';

    return Html.extend({
        defaults: {
            form: '${ $.namespace }.${ $.namespace }',
            visible: false,
            imports: {
                responseData: '${ $.form }:responseData',
                visible: 'responseData.error',
                content: 'responseData.messages'
            },
            listens: {
                '${ $.provider }:data.reset': 'hide'
            }
        },

        /**
         * Show messages.
         */
        show: function () {
            this.visible(true);
        },

        /**
         * Hide messages.
         */
        hide: function () {
            this.visible(false);
        }
    });
});
