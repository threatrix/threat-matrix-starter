/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/zarnaparekh/magento1/releases/tag/master-24cdb3e
*    Source File: disable-hide-select.js
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
    'Magento_Ui/js/form/element/select',
    'Magento_Catalog/js/components/visible-on-option/strategy',
    'Magento_Catalog/js/components/disable-on-option/strategy'
], function (Element, visibleStrategy, disableStrategy) {
    'use strict';

    return Element.extend(visibleStrategy).extend(disableStrategy);
});
