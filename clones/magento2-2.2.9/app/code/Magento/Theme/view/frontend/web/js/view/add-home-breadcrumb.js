/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/ZeeshanShafiq1161/testproject/releases/tag/master-ff34526
*    Source File: add-home-breadcrumb.js
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
/* eslint-disable max-nested-callbacks, no-undef */
define([
    'jquery',
    'Magento_Theme/js/model/breadcrumb-list',
    'mage/translate'
], function ($, breadcrumbList) {
    'use strict';

    /**
     * @return {Object}
     */
    var homeCrumb = function () {
        return {
            name: 'home',
            label: $.mage.__('Home'),
            title: $.mage.__('Go to Home Page'),
            link: BASE_URL || ''
        };
    };

    return function (breadcrumb) {

        breadcrumbList.unshift(homeCrumb());

        return breadcrumb;
    };
});
