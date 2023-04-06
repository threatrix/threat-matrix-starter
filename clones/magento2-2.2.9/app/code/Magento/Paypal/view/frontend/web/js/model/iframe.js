/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/mvnp/Magento-2-Com-Banco-de-Dados/releases/tag/master-f15566d
*    Source File: iframe.js
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

define(['ko'], function (ko) {
    'use strict';

    var isInAction = ko.observable(false);

    return {
        isInAction: isInAction,

        /**
         * @param {jQuery.Event} event
         */
        stopEventPropagation: function (event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        }
    };
});
