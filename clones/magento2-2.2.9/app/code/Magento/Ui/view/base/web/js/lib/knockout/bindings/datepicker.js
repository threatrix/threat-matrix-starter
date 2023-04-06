/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/allininfosystems/marinetechtools/releases/tag/master-eefa26e
*    Source File: datepicker.js
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
/** Creates datepicker binding and registers in to ko.bindingHandlers object */
define([
    'ko',
    'underscore',
    'jquery',
    'mage/translate',
    'mage/calendar',
    'moment',
    'mageUtils'
], function (ko, _, $, $t, calendar, moment, utils) {
    'use strict';

    var defaults = {
        dateFormat: 'mm\/dd\/yyyy',
        showsTime: false,
        timeFormat: null,
        buttonImage: null,
        buttonImageOnly: null,
        buttonText: $t('Select Date')
    };

    ko.bindingHandlers.datepicker = {
        /**
         * Initializes calendar widget on element and stores it's value to observable property.
         * Datepicker binding takes either observable property or object
         *  { storage: {ko.observable}, options: {Object} }.
         * For more info about options take a look at "mage/calendar" and jquery.ui.datepicker widget.
         * @param {HTMLElement} el - Element, that binding is applied to
         * @param {Function} valueAccessor - Function that returns value, passed to binding
         */
        init: function (el, valueAccessor) {
            var config = valueAccessor(),
                observable,
                options = {};

            _.extend(options, defaults);

            if (typeof config === 'object') {
                observable = config.storage;

                _.extend(options, config.options);
            } else {
                observable = config;
            }

            $(el).calendar(options);

            observable() && $(el).datepicker(
                'setDate',
                moment(
                    observable(),
                    utils.convertToMomentFormat(
                        options.dateFormat + (options.showsTime ? ' ' + options.timeFormat : '')
                    )
                ).toDate()
            );

            $(el).blur();

            ko.utils.registerEventHandler(el, 'change', function () {
                observable(this.value);
            });
        }
    };
});
