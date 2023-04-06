/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/surajrana07/Orion/releases/tag/master-66169bd
*    Source File: composite.js
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
 * @deprecated since version 2.2.0
 */
/* eslint-disable strict */
define(['jquery'], function ($) {
    return function () {
        var renderedChildren = {},
            children = {};

        return {
            /**
             * @param {*} child
             * @param {String} key
             */
            addChild: function (child, key) {
                children[key] = child;
            },

            /**
             * @param {*} root
             */
            render: function (root) {
                $.each(children, function (key, child) {
                    var childRoot = $('<div>');

                    renderedChildren[key] = child.render(childRoot);
                    root.append(childRoot);
                });
            }
        };
    };
});
