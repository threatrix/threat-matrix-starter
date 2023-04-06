/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: http://www.magento.com
*    Release: https://github.com/magento/magento2/releases/tag/2.2.9
*    Source File: wysiwyg.js
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
    'Magento_Ui/js/lib/view/utils/async',
    'underscore',
    'ko',
    './abstract',
    'Magento_Variable/variables'
], function ($, _, ko, Abstract) {
    'use strict';

    return Abstract.extend({
        defaults: {
            elementSelector: 'textarea',
            suffixRegExpPattern: '${ $.wysiwygUniqueSuffix }',
            $wysiwygEditorButton: '',
            links: {
                value: '${ $.provider }:${ $.dataScope }'
            },
            template: 'ui/form/field',
            elementTmpl: 'ui/form/element/wysiwyg',
            content: '',
            showSpinner: false,
            loading: false,
            listens: {
                disabled: 'setDisabled'
            }
        },

        /**
         *
         * @returns {} Chainable.
         */
        initialize: function () {
            this._super()
                .initNodeListener();

            $.async({
                component: this,
                selector: 'button'
            }, function (element) {
                this.$wysiwygEditorButton = this.$wysiwygEditorButton ?
                    this.$wysiwygEditorButton.add($(element)) : $(element);
            }.bind(this));

            return this;
        },

        /** @inheritdoc */
        initConfig: function (config) {
            var pattern = config.suffixRegExpPattern || this.constructor.defaults.suffixRegExpPattern;

            pattern = pattern.replace(/\$/g, '\\$&');
            config.content = config.content.replace(new RegExp(pattern, 'g'), this.getUniqueSuffix(config));
            this._super();

            return this;
        },

        /**
         * Build unique id based on name, underscore separated.
         *
         * @param {Object} config
         */
        getUniqueSuffix: function (config) {
            return config.name.replace(/(\.|-)/g, '_');
        },

        /**
         *
         * @returns {exports}
         */
        initObservable: function () {
            this._super()
                .observe('value');

            return this;
        },

        /**
         *
         * @returns {} Chainable.
         */
        initNodeListener: function () {
            $.async({
                component: this,
                selector: this.elementSelector
            }, this.setElementNode.bind(this));

            return this;
        },

        /**
         *
         * @param {HTMLElement} node
         */
        setElementNode: function (node) {
            $(node).bindings({
                value: this.value
            });
        },

        /**
         * Set disabled property to wysiwyg component
         *
         * @param {Boolean} status
         */
        setDisabled: function (status) {
            this.$wysiwygEditorButton.attr('disabled', status);

            /* eslint-disable no-undef */
            if (tinyMCE && tinyMCE.activeEditor) {
                _.each(tinyMCE.activeEditor.controlManager.controls, function (property, index, controls) {
                    controls[property.id].setDisabled(status);
                });

                tinyMCE.activeEditor.getBody().setAttribute('contenteditable', !status);
            }

            /* eslint-enable  no-undef*/
        }
    });
});
