/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fascinosum/magento2/releases/tag/2.3.1
*    Source File: confirm.js
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
    'jquery',
    'underscore',
    'mage/translate',
    'jquery/ui',
    'Magento_Ui/js/modal/modal'
], function ($, _, $t) {
    'use strict';

    $.widget('mage.confirm', $.mage.modal, {
        options: {
            modalClass: 'confirm',
            title: '',
            focus: '.action-accept',
            actions: {

                /**
                 * Callback always - called on all actions.
                 */
                always: function () {},

                /**
                 * Callback confirm.
                 */
                confirm: function () {},

                /**
                 * Callback cancel.
                 */
                cancel: function () {}
            },
            buttons: [{
                text: $t('Cancel'),
                class: 'action-secondary action-dismiss',

                /**
                 * Click handler.
                 */
                click: function (event) {
                    this.closeModal(event);
                }
            }, {
                text: $t('OK'),
                class: 'action-primary action-accept',

                /**
                 * Click handler.
                 */
                click: function (event) {
                    this.closeModal(event, true);
                }
            }]
        },

        /**
         * Create widget.
         */
        _create: function () {
            this._super();
            this.modal.find(this.options.modalCloseBtn).off().on('click', _.bind(this.closeModal, this));
            this.openModal();
        },

        /**
         * Remove modal window.
         */
        _remove: function () {
            this.modal.remove();
        },

        /**
         * Open modal window.
         */
        openModal: function () {
            return this._super();
        },

        /**
         * Close modal window.
         */
        closeModal: function (event, result) {
            result = result || false;

            if (result) {
                this.options.actions.confirm(event);
            } else {
                this.options.actions.cancel(event);
            }
            this.options.actions.always(event);
            this.element.bind('confirmclosed', _.bind(this._remove, this));

            return this._super();
        }
    });

    return function (config) {
        return $('<div></div>').html(config.content).confirm(config);
    };
});
