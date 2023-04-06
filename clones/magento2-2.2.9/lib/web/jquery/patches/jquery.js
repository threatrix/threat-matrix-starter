/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/singharti/08-07-19/releases/tag/master-8dcb0b8
*    Source File: jquery.js
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

define([], function () {
    'use strict';

    /**
     * Patch for CVE-2015-9251 (XSS vulnerability).
     * Can safely remove only when jQuery UI is upgraded to >= 3.3.x.
     * https://www.cvedetails.com/cve/CVE-2015-9251/
     */
    function ajaxResponsePatch(jQuery) {
        jQuery.ajaxPrefilter(function (s) {
            if (s.crossDomain) {
                s.contents.script = false;
            }
        });
    }

    return function ($) {
        var majorVersion = $.fn.jquery.split('.')[0];

        $.noConflict();

        if (majorVersion >= 3) {
            console.warn('jQuery patch for CVE-2015-9251 is no longer necessary, and should be removed');
        }

        ajaxResponsePatch(jQuery);

        return jQuery;
    };
});
