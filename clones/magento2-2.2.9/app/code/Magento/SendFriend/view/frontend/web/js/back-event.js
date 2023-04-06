/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/godhanshashank/magento2/releases/tag/master-bf79fcd
*    Source File: back-event.js
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
    'jquery'
], function ($) {
    'use strict';

    return function (config, element) {
        $(element).on('click', function () {
            history.back();

            return false;
        });
    };
});
