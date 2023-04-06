/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fascinosum/magento2/releases/tag/2.3.1
*    Source File: price-option-file.js
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
    'jquery/ui'
], function ($) {
    'use strict';

    $.widget('mage.priceOptionFile', {
        options: {
            fileName: '',
            fileNamed: '',
            fieldNameAction: '',
            changeFileSelector: '',
            deleteFileSelector: ''
        },

        /**
         * Creates instance of widget
         * @private
         */
        _create: function () {
            this.fileDeleteFlag = this.fileChangeFlag = false;
            this.inputField = this.element.find('input[name=' + this.options.fileName + ']')[0];
            this.inputFieldAction = this.element.find('input[name=' + this.options.fieldNameAction + ']')[0];
            this.fileNameSpan = this.element.parent('dd').find('.' + this.options.fileNamed);

            $(this.options.changeFileSelector).on('click', $.proxy(function () {
                this._toggleFileChange();
            }, this));
            $(this.options.deleteFileSelector).on('click', $.proxy(function () {
                this._toggleFileDelete();
            }, this));
        },

        /**
         * Toggles whether the current file is being changed or not. If the file is being deleted
         * then the option to change the file is disabled.
         * @private
         */
        _toggleFileChange: function () {
            this.element.toggle();
            this.fileChangeFlag = !this.fileChangeFlag;

            if (!this.fileDeleteFlag) {
                $(this.inputFieldAction).attr('value', this.fileChangeFlag ? 'save_new' : 'save_old');
                this.inputField.disabled = !this.fileChangeFlag;
            }
        },

        /**
         * Toggles whether the file is to be deleted. When the file is being deleted, the name of
         * the file is decorated with strike-through text and the option to change the file is
         * disabled.
         * @private
         */
        _toggleFileDelete: function () {
            this.fileDeleteFlag = $(this.options.deleteFileSelector + ':checked').val();
            $(this.inputFieldAction).attr('value',
                this.fileDeleteFlag ? '' : this.fileChangeFlag ? 'save_new' : 'save_old');
            this.inputField.disabled = this.fileDeleteFlag || !this.fileChangeFlag;
            this.fileNameSpan.css('text-decoration', this.fileDeleteFlag ? 'line-through' : 'none');
        }
    });

    return $.mage.priceOptionFile;
});
