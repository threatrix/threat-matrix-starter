/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/uzair90/versatbales/releases/tag/master-ac9070b
*    Source File: configurable-customer-data.js
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
    'Magento_ConfigurableProduct/js/options-updater',
    'jquery/ui'
], function ($, Updater) {
    'use strict';

    $.widget('mage.selectSwatch', {
        options: {
            swatchOptions: null,
            selectors: {
                formSelector: '#product_addtocart_form',
                swatchSelector: '.swatch-opt'
            },
            swatchWidgetName: 'mageSwatchRenderer',
            widgetInitEvent: 'swatch.initialized',
            clickEventName: 'emulateClick'
        },

        /**
         * Widget initialisation.
         * Configurable product options updater listens to selected swatch options
         */
        _init: function () {
            var updater;

            updater = new Updater(this.options.widgetInitEvent, this.selectDefaultSwatchOptions.bind(this));
            updater.listen();
        },

        /**
         * Sets default configurable swatch attribute's selected
         */
        selectDefaultSwatchOptions: function () {
            var swatchWidget = $(this.options.selectors.swatchSelector).data(this.options.swatchWidgetName);

            if (!swatchWidget || !swatchWidget._EmulateSelectedByAttributeId) {
                return;
            }
            swatchWidget._EmulateSelectedByAttributeId(
                this.options.swatchOptions.defaultValues, this.options.clickEventName
            );
        }
    });

    return $.mage.selectSwatch;
});
