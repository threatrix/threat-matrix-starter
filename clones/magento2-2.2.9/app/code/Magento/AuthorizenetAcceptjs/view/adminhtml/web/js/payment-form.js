/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/lindomarcb/Magento-2/releases/tag/master-bd21871
*    Source File: payment-form.js
*    
*    Copyrights:
*      copyright © magento, inc. all rights reserved
*    
*    Licenses:
*      Open Software License 3.0
*      SPDXId: OSL-3.0
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
    'Magento_AuthorizenetAcceptjs/js/authorizenet',
    'jquery'
], function (AuthorizenetAcceptjs, $) {
    'use strict';

    return function (config, element) {
        var $form = $(element);

        config.active = $form.length > 0 && !$form.is(':hidden');
        new AuthorizenetAcceptjs(config);
    };
});
