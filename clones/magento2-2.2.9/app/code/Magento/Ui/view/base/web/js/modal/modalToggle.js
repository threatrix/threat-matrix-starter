/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/fascinosum/magento2/releases/tag/2.3.1
*    Source File: modalToggle.js
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
    'Magento_Ui/js/modal/modal'
], function ($) {
    'use strict';

    return function (config, el) {
        var widget,
            content;

        if (config.contentSelector) {
            content = $(config.contentSelector);
        } else if (config.content) {
            content = $('<div />').html(config.content);
        } else {
            content = $('<div />');
        }

        widget = content.modal(config);

        $(el).on(config.toggleEvent, function () {
            var state = widget.data('mage-modal').options.isOpen;

            if (state) {
                widget.modal('closeModal');
            } else {
                widget.modal('openModal');
            }

            return false;
        });

        return widget;
    };
});
