/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://magento.com
*    Release: https://github.com/magedin/magento-opensource-releases/releases/tag/2.2.11
*    Source File: captcha.js
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

/*global alert*/
define([
    'jquery',
    'ko',
    'Magento_Captcha/js/action/refresh'
], function ($, ko, refreshAction) {
    'use strict';

    return function (captchaData) {
        return {
            formId: captchaData.formId,
            imageSource: ko.observable(captchaData.imageSrc),
            visibility: ko.observable(false),
            captchaValue: ko.observable(null),
            isRequired: ko.observable(captchaData.isRequired),
            isCaseSensitive: captchaData.isCaseSensitive,
            imageHeight: captchaData.imageHeight,
            refreshUrl: captchaData.refreshUrl,
            isLoading: ko.observable(false),

            /**
             * @return {String}
             */
            getFormId: function () {
                return this.formId;
            },

            /**
             * @param {String} formId
             */
            setFormId: function (formId) {
                this.formId = formId;
            },

            /**
             * @return {Boolean}
             */
            getIsVisible: function () {
                return this.visibility();
            },

            /**
             * @param {Boolean} flag
             */
            setIsVisible: function (flag) {
                this.visibility(flag);
            },

            /**
             * @return {Boolean}
             */
            getIsRequired: function () {
                return this.isRequired();
            },

            /**
             * @param {Boolean} flag
             */
            setIsRequired: function (flag) {
                this.isRequired(flag);
            },

            /**
             * @return {Boolean}
             */
            getIsCaseSensitive: function () {
                return this.isCaseSensitive;
            },

            /**
             * @param {Boolean} flag
             */
            setIsCaseSensitive: function (flag) {
                this.isCaseSensitive = flag;
            },

            /**
             * @return {String|Number}
             */
            getImageHeight: function () {
                return this.imageHeight;
            },

            /**
             * @param {String|Number}height
             */
            setImageHeight: function (height) {
                this.imageHeight = height;
            },

            /**
             * @return {String}
             */
            getImageSource: function () {
                return this.imageSource;
            },

            /**
             * @param {String} imageSource
             */
            setImageSource: function (imageSource) {
                this.imageSource(imageSource);
            },

            /**
             * @return {String}
             */
            getRefreshUrl: function () {
                return this.refreshUrl;
            },

            /**
             * @param {String} url
             */
            setRefreshUrl: function (url) {
                this.refreshUrl = url;
            },

            /**
             * @return {*}
             */
            getCaptchaValue: function () {
                return this.captchaValue;
            },

            /**
             * @param {*} value
             */
            setCaptchaValue: function (value) {
                this.captchaValue(value);
            },

            /**
             * Refresh captcha.
             */
            refresh: function () {
                var refresh,
                    self = this;

                this.isLoading(true);

                refresh = refreshAction(this.getRefreshUrl(), this.getFormId(), this.getImageSource());
                $.when(refresh).done(function () {
                    self.isLoading(false);
                });
            }
        };
    };
});
