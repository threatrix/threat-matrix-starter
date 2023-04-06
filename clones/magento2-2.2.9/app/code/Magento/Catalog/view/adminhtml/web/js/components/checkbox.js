/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: http://www.magento.com
*    Release: https://github.com/magento/magento2/releases/tag/2.3.7-p2
*    Source File: checkbox.js
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
 * @deprecated since version 2.2.0
 */
define([
    'Magento_Ui/js/form/element/abstract',
    'knockout'
], function (Abstract, ko) {
    'use strict';

    return Abstract.extend({

        /**
         * Initializes observable properties of instance
         *
         * @returns {Element} Chainable.
         */
        initObservable: function () {
            this._super()
                .observe('checked');

            this.value = ko.pureComputed({

                /**
                 * use 'mappedValue' as value if checked
                 */
                read: function () {
                    return this.checked() ? this.mappedValue : '';
                },

                /**
                 * any value made checkbox checked
                 */
                write: function (val) {
                    if (val) {
                        this.checked(true);
                    }
                },
                owner: this
            });

            return this;
        }
    });
});
