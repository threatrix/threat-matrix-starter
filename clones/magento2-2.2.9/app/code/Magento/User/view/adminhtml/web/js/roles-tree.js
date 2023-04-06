/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/coolJenny/ma_demo/releases/tag/master-b924437
*    Source File: roles-tree.js
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
    'jquery/ui',
    'jquery/jstree/jquery.jstree'
], function ($) {
    'use strict';

    $.widget('mage.rolesTree', {
        options: {
            treeInitData: {},
            treeInitSelectedData: {}
        },

        /** @inheritdoc */
        _create: function () {
            this.element.jstree({
                plugins: ['themes', 'json_data', 'ui', 'crrm', 'types', 'vcheckbox', 'hotkeys'],
                vcheckbox: {
                    'two_state': true,
                    'real_checkboxes': true,

                    /**
                     * @param {*} n
                     * @return {Array}
                     */
                    'real_checkboxes_names': function (n) {
                        return ['resource[]', $(n).data('id')];
                    }
                },
                'json_data': {
                    data: this.options.treeInitData
                },
                ui: {
                    'select_limit': 0
                },
                hotkeys: {
                    space: this._changeState,
                    'return': this._changeState
                },
                types: {
                    'types': {
                        'disabled': {
                            'check_node': false,
                            'uncheck_node': false
                        }
                    }
                }
            });
            this._bind();
        },

        /**
         * @private
         */
        _destroy: function () {
            this.element.jstree('destroy');
        },

        /**
         * @private
         */
        _bind: function () {
            this.element.on('loaded.jstree', $.proxy(this._checkNodes, this));
            this.element.on('click.jstree', 'a', $.proxy(this._checkNode, this));
        },

        /**
         * @param {jQuery.Event} event
         * @private
         */
        _checkNode: function (event) {
            event.stopPropagation();
            this.element.jstree(
                'change_state',
                event.currentTarget,
                this.element.jstree('is_checked', event.currentTarget)
            );
        },

        /**
         * @private
         */
        _checkNodes: function () {
            var $items = $('[data-id="' + this.options.treeInitSelectedData.join('"],[data-id="') + '"]');

            $items.removeClass('jstree-unchecked').addClass('jstree-checked');
            $items.children(':checkbox').prop('checked', true);
        },

        /**
         * @return {Boolean}
         * @private
         */
        _changeState: function () {
            var element;

            if (this.data.ui.hovered) {
                element = this.data.ui.hovered;
                this['change_state'](element, this['is_checked'](element));
            }

            return false;
        }
    });

    return $.mage.rolesTree;
});
