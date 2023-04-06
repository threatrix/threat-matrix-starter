/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Release: https://github.com/Magestore/devops-magento-2.2.1/releases/tag/master-69f8ef8
*    Source File: customer.js
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
    'ko',
    'underscore',
    './address-list'
], function ($, ko, _, addressList) {
    'use strict';

    var isLoggedIn = ko.observable(window.isCustomerLoggedIn),
        customerData = {};

    if (isLoggedIn()) {
        customerData = window.customerData;
    } else {
        customerData = {};
    }

    return {
        customerData: customerData,
        customerDetails: {},
        isLoggedIn: isLoggedIn,

        /**
         * @param {Boolean} flag
         */
        setIsLoggedIn: function (flag) {
            isLoggedIn(flag);
        },

        /**
         * @return {Array}
         */
        getBillingAddressList: function () {
            return addressList();
        },

        /**
         * @return {Array}
         */
        getShippingAddressList: function () {
            return addressList();
        },

        /**
         * @param {String} fieldName
         * @param {*} value
         */
        setDetails: function (fieldName, value) {
            if (fieldName) {
                this.customerDetails[fieldName] = value;
            }
        },

        /**
         * @param {String} fieldName
         * @return {*}
         */
        getDetails: function (fieldName) {
            if (fieldName) {
                if (this.customerDetails.hasOwnProperty(fieldName)) {
                    return this.customerDetails[fieldName];
                }

                return undefined;
            }

            return this.customerDetails;
        },

        /**
         * @param {Array} address
         * @return {Number}
         */
        addCustomerAddress: function (address) {
            var fields = [
                    'customer_id', 'country_id', 'street', 'company', 'telephone', 'fax', 'postcode', 'city',
                    'firstname', 'lastname', 'middlename', 'prefix', 'suffix', 'vat_id', 'default_billing',
                    'default_shipping'
                ],
                customerAddress = {},
                hasAddress = 0,
                existingAddress;

            if (!this.customerData.addresses) {
                this.customerData.addresses = [];
            }

            customerAddress = _.pick(address, fields);

            if (address.hasOwnProperty('region_id')) {
                customerAddress.region = {
                    'region_id': address['region_id'],
                    region: address.region
                };
            }

            for (existingAddress in this.customerData.addresses) {
                if (this.customerData.addresses.hasOwnProperty(existingAddress)) {
                    if (_.isEqual(this.customerData.addresses[existingAddress], customerAddress)) { //eslint-disable-line
                        hasAddress = existingAddress;
                        break;
                    }
                }
            }

            if (hasAddress === 0) {
                return this.customerData.addresses.push(customerAddress) - 1;
            }

            return hasAddress;
        },

        /**
         * @param {*} addressId
         * @return {Boolean}
         */
        setAddressAsDefaultBilling: function (addressId) {
            if (this.customerData.addresses[addressId]) {
                this.customerData.addresses[addressId]['default_billing'] = 1;

                return true;
            }

            return false;
        },

        /**
         * @param {*} addressId
         * @return {Boolean}
         */
        setAddressAsDefaultShipping: function (addressId) {
            if (this.customerData.addresses[addressId]) {
                this.customerData.addresses[addressId]['default_shipping'] = 1;

                return true;
            }

            return false;
        }
    };
});
