/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/ZeeshanShafiq1161/testproject/releases/tag/master-ff34526
*    Source File: component.js
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
    'Magento_Ui/js/modal/modal-component',
    'Magento_Ui/js/modal/alert',
    'mage/translate'
], function ($, Modal, alert, $t) {
    'use strict';

    return Modal.extend({
        defaults: {
            imports: {
                logAction:  '${ $.provider }:data.logAction'
            }
        },

        /**
         * Error handler.
         *
         * @param {Object} xhr - request result.
         */
        onError: function (xhr) {
            if (xhr.statusText === 'abort') {
                return;
            }

            alert({
                content: xhr.message || $t('An error occurred while logging process.')
            });
        },

        /**
         * Log release notes show
         */
        logReleaseNotesShow: function () {
            var self = this,
                data = {
                    'form_key': window.FORM_KEY
                };

            $.ajax({
                type: 'POST',
                url: this.logAction,
                data: data,
                showLoader: true
            }).done(function (xhr) {
                if (xhr.error) {
                    self.onError(xhr);
                }
            }).fail(this.onError);
        },

        /**
         * Close release notes
         */
        closeReleaseNotes: function () {
            this.logReleaseNotesShow();
            this.closeModal();
        }
    });
});
