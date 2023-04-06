/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/magento-engcom/import-export-improvements/releases/tag/2.3-develop-d1906d8
*    Source File: iframe-redirect.js
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
    'ko',
    'Magento_Paypal/js/model/iframe',
    'Magento_Ui/js/model/messageList'
],
function (ko, iframe, messageList) {
    'use strict';

    return function (cartUrl, errorMessage, goToSuccessPage, successUrl) {
        if (this === window.self) {
            window.location = cartUrl;
        }

        if (!!errorMessage.message) { //eslint-disable-line no-extra-boolean-cast
            document.removeEventListener('click', iframe.stopEventPropagation, true);
            iframe.isInAction(false);
            messageList.addErrorMessage(errorMessage);
        } else if (!!goToSuccessPage) { //eslint-disable-line no-extra-boolean-cast
            window.location = successUrl;
        } else {
            window.location = cartUrl;
        }
    };
});
