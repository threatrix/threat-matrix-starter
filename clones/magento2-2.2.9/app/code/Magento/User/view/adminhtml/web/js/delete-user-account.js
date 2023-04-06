/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/oceanerousseeuw/autoformation_magento2/releases/tag/master-163446a
*    Source File: delete-user-account.js
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

    var postData;

    return function (params, elem) {

        elem.on('click', function () {

            postData = {
                'data': {
                    'user_id': params.objId,
                    'current_password': $('[name="current_password"]').val()
                }
            };

            if ($.validator.validateElement($('[name="current_password"]'))) {
                window.deleteConfirm(params.message, params.url, postData);
            }
        });
    };
});
