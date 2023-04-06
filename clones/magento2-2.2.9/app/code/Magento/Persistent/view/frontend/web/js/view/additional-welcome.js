/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/singharti/08-07-19/releases/tag/master-8dcb0b8
*    Source File: additional-welcome.js
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
    'jquery',
    'mage/translate',
    'Magento_Customer/js/customer-data'
], function ($, $t, customerData) {
    'use strict';

    return {
        /**
         * Init
         */
        init: function () {
            var persistent = customerData.get('persistent');

            if (persistent().fullname === undefined) {
                customerData.get('persistent').subscribe(this.replacePersistentWelcome);
            } else {
                this.replacePersistentWelcome();
            }
        },

        /**
         * Replace welcome message for customer with persistent cookie.
         */
        replacePersistentWelcome: function () {
            var persistent = customerData.get('persistent'),
                welcomeElems;

            if (persistent().fullname !== undefined) {
                welcomeElems = $('li.greet.welcome > span.not-logged-in');

                if (welcomeElems.length) {
                    $(welcomeElems).each(function () {
                        var html = $t('Welcome, %1!').replace('%1', persistent().fullname);

                        $(this).attr('data-bind', html);
                        $(this).html(html);
                    });
                }
            }
        },

        /**
         * @constructor
         */
        'Magento_Persistent/js/view/additional-welcome': function () {
            this.init();
        }
    };
});
