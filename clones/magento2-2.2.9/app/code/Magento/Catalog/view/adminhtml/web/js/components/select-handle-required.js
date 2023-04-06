/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/shubhamjaissy/goodie/releases/tag/master-5fbf1d0
*    Source File: select-handle-required.js
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
    'Magento_Ui/js/form/element/select'
], function (Select) {
    'use strict';

    return Select.extend({

        /**
         * Disable required validation, when 'use config option' checked
         */
        handleRequired: function (newValue) {
            this.validation['required-entry'] = !newValue;
            this.required(!newValue);
            this.error(false);
        }
    });
});
