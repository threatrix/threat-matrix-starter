/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/austin-technology/austin_magento_2/releases/tag/master-f890a0f
*    Source File: staticChecked.js
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
    '../template/renderer'
], function (ko, renderer) {
    'use strict';

    ko.bindingHandlers.staticChecked = {
        'after': ['value', 'attr'],

        /**
         * Implements same functionality as a standard 'checked' binding,
         * but with a difference that it wont' change values array if
         * value of DOM element changes.
         */
        init: function (element, valueAccessor, allBindings) {
            var isCheckbox = element.type === 'checkbox',
                isRadio = element.type === 'radio',
                isValueArray,
                oldElemValue,
                useCheckedValue,
                checkedValue,
                updateModel,
                updateView;

            if (!isCheckbox && !isRadio) {
                return;
            }

            checkedValue = ko.pureComputed(function () {
                if (allBindings.has('checkedValue')) {
                    return ko.utils.unwrapObservable(allBindings.get('checkedValue'));
                } else if (allBindings.has('value')) {
                    return ko.utils.unwrapObservable(allBindings.get('value'));
                }

                return element.value;
            });

            isValueArray = isCheckbox && ko.utils.unwrapObservable(valueAccessor()) instanceof Array;
            oldElemValue = isValueArray ? checkedValue() : undefined;
            useCheckedValue = isRadio || isValueArray;

            /**
             * Updates values array if it's necessary.
             */
            updateModel = function () {
                var isChecked = element.checked,
                    elemValue = useCheckedValue ? checkedValue() : isChecked,
                    modelValue;

                if (ko.computedContext.isInitial()) {
                    return;
                }

                if (isRadio && !isChecked) {
                    return;
                }

                modelValue = ko.dependencyDetection.ignore(valueAccessor);

                if (isValueArray) {
                    if (oldElemValue !== elemValue) {
                        oldElemValue = elemValue;
                    } else {
                        ko.utils.addOrRemoveItem(modelValue, elemValue, isChecked);
                    }
                } else {
                    ko.expressionRewriting.writeValueToProperty(modelValue, allBindings, 'checked', elemValue, true);
                }
            };

            /**
             * Updates checkbox state.
             */
            updateView = function () {
                var modelValue = ko.utils.unwrapObservable(valueAccessor());

                if (isValueArray) {
                    element.checked = ko.utils.arrayIndexOf(modelValue, checkedValue()) >= 0;
                } else if (isCheckbox) {
                    element.checked = modelValue;
                } else {
                    element.checked = checkedValue() === modelValue;
                }
            };

            ko.computed(updateModel, null, {
                disposeWhenNodeIsRemoved: element
            });

            ko.utils.registerEventHandler(element, 'click', updateModel);

            ko.computed(updateView, null, {
                disposeWhenNodeIsRemoved: element
            });
        }
    };

    ko.expressionRewriting.twoWayBindings.staticChecked = true;

    renderer.addAttribute('staticChecked');
});
