/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/manish0345/krishtech/releases/tag/master-666c29b
*    Source File: gallery.js
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

(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define([
            'jquery',
            'jquery/ui'
        ], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {
    'use strict';

    $.widget('mage.gallery', {
        options: {
            minWidth: 300, // Minimum width of the gallery image.
            widthOffset: 90, // Offset added to the width of the gallery image.
            heightOffset: 210, // Offset added to the height of the gallery image.
            closeWindow: 'div.buttons-set a[role="close-window"]' // Selector for closing the gallery popup window.
        },

        /**
         * Bind click handler for closing the popup window and resize the popup based on the image size.
         * @private
         */
        _create: function () {
            $(this.options.closeWindow).on('click', function () {
                window.close();
            });
            this._resizeWindow();
        },

        /**
         * Resize the gallery image popup window based on the image's dimensions.
         * @private
         */
        _resizeWindow: function () {
            var img = this.element,
                width = img.width() < this.options.minWidth ? this.options.minWidth : img.width();

            window.resizeTo(width + this.options.widthOffset, img.height() + this.options.heightOffset);
        }
    });

    return $.mage.gallery;
}));
