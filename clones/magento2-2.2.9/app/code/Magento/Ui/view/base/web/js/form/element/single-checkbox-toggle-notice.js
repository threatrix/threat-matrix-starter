/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/zarnaparekh/magento1/releases/tag/master-24cdb3e
*    Source File: single-checkbox-toggle-notice.js
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
    'Magento_Ui/js/form/element/single-checkbox'
], function (SingleCheckbox) {
    'use strict';

    return SingleCheckbox.extend({
        defaults: {
            notices: [],
            tracks: {
                notice: true
            }
        },

        /**
         * Choose notice on initialization
         *
         * @returns {*|void|Element}
         */
        initialize: function () {
            this._super()
                .chooseNotice();

            return this;
        },

        /**
         * Choose notice function
         *
         * @returns void
         */
        chooseNotice: function () {
            var checkedNoticeNumber = Number(this.checked());

            this.notice = this.notices[checkedNoticeNumber];
        },

        /**
         * Choose notice on update
         *
         * @returns void
         */
        onUpdate: function () {
            this._super();
            this.chooseNotice();
        }
    });
});
