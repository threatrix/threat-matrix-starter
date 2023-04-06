/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/ilyasmuyiwa/Assignment/releases/tag/master-6f14b43
*    Source File: type-change.js
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
require([
    'jquery',
    'mage/translate'
], function ($) {
    'use strict';

    $(function () {

        // disabled select only
        $('select#frontend_input:disabled').each(function () {
            var select = $(this),
                currentValue = select.find('option:selected').val(),
                enabledTypes = ['select', 'swatch_visual', 'swatch_text'],
                warning = $('<label>')
                    .hide()
                    .text($.mage.__('These changes affect all related products.'))
                    .addClass('mage-error')
                    .attr({
                        generated: true, for: select.attr('id')
                    }),

                /**
                 * Toggle hint about changes types
                 */
                toggleWarning = function () {
                    if (select.find('option:selected').val() === currentValue) {
                        warning.hide();
                    } else {
                        warning.show();
                    }
                },

                /**
                 * Remove unsupported options
                 */
                removeOption = function () {
                    if (!~enabledTypes.indexOf($(this).val())) {
                        $(this).remove();
                    }
                };

            // Check current type (allow only: select, swatch_visual, swatch_text)
            if (!~enabledTypes.indexOf(currentValue)) {
                return;
            }

            // Enable select and keep only available options (all other will be removed)
            select.removeAttr('disabled').find('option').each(removeOption);

            // Add warning on page and event for show/hide it
            select.after(warning).on('change', toggleWarning);
        });
    });
});
