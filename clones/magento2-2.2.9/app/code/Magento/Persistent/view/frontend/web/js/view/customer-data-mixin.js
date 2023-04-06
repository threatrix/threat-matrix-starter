/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/nguyendv99/magento/releases/tag/master-2818d0a
*    Source File: customer-data-mixin.js
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
    'mage/utils/wrapper'
], function ($, wrapper) {
    'use strict';

    var mixin = {

        /**
         * Check if persistent section is expired due to lifetime.
         *
         * @param {Function} originFn - Original method.
         * @return {Array}
         */
        getExpiredSectionNames: function (originFn) {
            var expiredSections = originFn(),
                storage = $.initNamespaceStorage('mage-cache-storage').localStorage,
                currentTimestamp = Math.floor(Date.now() / 1000),
                persistentIndex = expiredSections.indexOf('persistent'),
                persistentLifeTime = 0,
                sectionData;

            if (window.persistent !== undefined && window.persistent.expirationLifetime !== undefined) {
                persistentLifeTime = window.persistent.expirationLifetime;
            }

            if (persistentIndex !== -1) {
                sectionData = storage.get('persistent');

                if (typeof sectionData === 'object' &&
                    sectionData['data_id'] + persistentLifeTime >= currentTimestamp
                ) {
                    expiredSections.splice(persistentIndex, 1);
                }
            }

            return expiredSections;
        }
    };

    /**
     * Override default customer-data.getExpiredSectionNames().
     */
    return function (target) {
        return wrapper.extend(target, mixin);
    };
});
