/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: http://www.magento.com
*    Release: https://github.com/magento/magento2/releases/tag/2.2.9
*    Source File: bootstrap.js
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
define(function (require) {
    'use strict';

    var renderer = require('../template/renderer');

    renderer.addAttribute('repeat', renderer.handlers.wrapAttribute);

    renderer.addAttribute('outerfasteach', {
        binding: 'fastForEach',
        handler: renderer.handlers.wrapAttribute
    });

    renderer
        .addNode('repeat')
        .addNode('fastForEach');

    return {
        resizable:      require('./resizable'),
        i18n:           require('./i18n'),
        scope:          require('./scope'),
        range:          require('./range'),
        mageInit:       require('./mage-init'),
        keyboard:       require('./keyboard'),
        optgroup:       require('./optgroup'),
        afterRender:     require('./after-render'),
        autoselect:     require('./autoselect'),
        datepicker:     require('./datepicker'),
        outerClick:     require('./outer_click'),
        fadeVisible:    require('./fadeVisible'),
        collapsible:    require('./collapsible'),
        staticChecked:  require('./staticChecked'),
        simpleChecked:  require('./simple-checked'),
        bindHtml:       require('./bind-html'),
        tooltip:        require('./tooltip'),
        repeat:         require('knockoutjs/knockout-repeat'),
        fastForEach:    require('knockoutjs/knockout-fast-foreach')
    };
});
