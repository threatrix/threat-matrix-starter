/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/yandrismatacabrera/magento_24/releases/tag/main-edf6c09
*    Source File: edit.js
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
 * Create/edit some category
 * @deprecated since version 2.2.0
 */

/* global tree */
define([
    'jquery',
    'prototype'
], function (jQuery) {
    'use strict';

    /** Category submit. */
    var categorySubmit = function () {
        var activeTab = $('active_tab_id'),
            params = {},
            fields, i,categoryId, isCreating, path, parentId, currentNode, oldClass, newClass;

        if (activeTab) {
            if (activeTab.tabsJsObject && activeTab.tabsJsObject.tabs('activeAnchor')) {
                activeTab.value = activeTab.tabsJsObject.tabs('activeAnchor').prop('id');
            }
        }

        fields = $('category_edit_form').getElementsBySelector('input', 'select');

        for (i = 0; i < fields.length; i++) {
            if (!fields[i].name) {
                continue;//jscs:ignore
            }
            params[fields[i].name] = fields[i].getValue();
        }

        // Get info about what we're submitting - to properly update tree nodes
        categoryId = params['general[id]'] ? params['general[id]'] : 0;
        isCreating = categoryId == 0; // eslint-disable-line eqeqeq
        path = params['general[path]'].split('/');
        parentId = path.pop();

        if (parentId == categoryId) { // eslint-disable-line eqeqeq
            parentId = path.pop();
        }

        // Make operations with category tree
        if (isCreating) {
            /* Some specific tasks for creating category */
            if (!tree.currentNodeId) {
                // First submit of form - select some node to be current
                tree.currentNodeId = parentId;
            }
            tree.addNodeTo = parentId;
        } else {
            /* Some specific tasks for editing category */
            // Maybe change category enabled/disabled style
            if (tree && tree.storeId == 0) {// eslint-disable-line eqeqeq, no-lonely-if
                currentNode = tree.getNodeById(categoryId);

                if (currentNode) {//eslint-disable-line max-depth
                    if (parseInt(params['general[is_active]'])) {//eslint-disable-line radix, max-depth
                        oldClass = 'no-active-category';
                        newClass = 'active-category';
                    } else {
                        oldClass = 'active-category';
                        newClass = 'no-active-category';
                    }

                    Element.removeClassName(currentNode.ui.wrap.firstChild, oldClass);
                    Element.addClassName(currentNode.ui.wrap.firstChild, newClass);
                }
            }
        }

        // Submit form
        jQuery('#category_edit_form').trigger('submit');
    };

    return function (config, element) {
        config = config || {};
        jQuery(element).on('click', function () {
            categorySubmit();
        });
    };
});
