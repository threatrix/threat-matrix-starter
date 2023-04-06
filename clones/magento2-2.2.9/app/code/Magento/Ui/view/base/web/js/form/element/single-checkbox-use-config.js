/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://github.com/magento/magento2
*    Release: https://github.com/magento/graphql-ce/releases/tag/2.3.3
*    Source File: single-checkbox-use-config.js
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
    'Magento_Ui/js/form/element/single-checkbox'
], function (Component) {
    'use strict';

    return Component.extend({
        defaults: {
            isUseDefault: false,
            isUseConfig: false,
            listens: {
                'isUseConfig': 'toggleElement',
                'isUseDefault': 'toggleElement'
            }
        },

        /**
         * @inheritdoc
         */
        initObservable: function () {

            return this
                ._super()
                .observe('isUseConfig');
        },

        /**
         * Toggle element
         */
        toggleElement: function () {
            this.disabled(this.isUseDefault() || this.isUseConfig());

            if (this.source) {
                this.source.set('data.use_default.' + this.index, Number(this.isUseDefault()));
            }
        }
    });
});
