/*
*    ------ BEGIN LICENSE ATTRIBUTION ------
*    
*    Portions of this file have been appropriated or derived from the following project(s) and therefore require attribution to the original licenses and authors.
*    
*    Project: https://github.com/magento/magento2
*    Release: https://github.com/magento/graphql-ce/releases/tag/2.2.10
*    Source File: shipping-estimation.js
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
define(
    [
        'jquery',
        'Magento_Ui/js/form/form',
        'Magento_Checkout/js/action/select-shipping-address',
        'Magento_Checkout/js/model/address-converter',
        'Magento_Checkout/js/model/cart/estimate-service',
        'Magento_Checkout/js/checkout-data',
        'Magento_Checkout/js/model/shipping-rates-validator',
        'uiRegistry',
        'Magento_Checkout/js/model/quote',
        'Magento_Checkout/js/model/checkout-data-resolver',
        'mage/validation'
    ],
    function (
        $,
        Component,
        selectShippingAddress,
        addressConverter,
        estimateService,
        checkoutData,
        shippingRatesValidator,
        registry,
        quote,
        checkoutDataResolver
    ) {
        'use strict';

        return Component.extend({
            defaults: {
                template: 'Magento_Checkout/cart/shipping-estimation'
            },
            isVirtual: quote.isVirtual(),

            /**
             * @override
             */
            initialize: function () {
                this._super();
                registry.async('checkoutProvider')(function (checkoutProvider) {
                    var address, estimatedAddress;

                    checkoutDataResolver.resolveEstimationAddress();
                    address = quote.isVirtual() ? quote.billingAddress() : quote.shippingAddress();

                    if (!address && quote.isVirtual()) {
                        address = addressConverter.formAddressDataToQuoteAddress(
                            checkoutData.getSelectedBillingAddress()
                        );
                    }

                    if (address) {
                        estimatedAddress = address.isEditable() ?
                            addressConverter.quoteAddressToFormAddressData(address) :
                            {
                                // only the following fields must be used by estimation form data provider
                                'country_id': address.countryId,
                                region: address.region,
                                'region_id': address.regionId,
                                postcode: address.postcode
                            };
                        checkoutProvider.set(
                            'shippingAddress',
                            $.extend({}, checkoutProvider.get('shippingAddress'), estimatedAddress)
                        );
                    }

                    if (!quote.isVirtual()) {
                        checkoutProvider.on('shippingAddress', function (shippingAddressData) {
                            checkoutData.setShippingAddressFromData(shippingAddressData);
                        });
                    } else {
                        checkoutProvider.on('shippingAddress', function (shippingAddressData) {
                            checkoutData.setBillingAddressFromData(shippingAddressData);
                        });
                    }
                });

                return this;
            },

            /**
             * @override
             */
            initElement: function (element) {
                this._super();

                if (element.index === 'address-fieldsets') {
                    shippingRatesValidator.bindChangeHandlers(element.elems(), true, 500);
                    element.elems.subscribe(function (elems) {
                        shippingRatesValidator.doElementBinding(elems[elems.length - 1], true, 500);
                    });
                }

                return this;
            },

            /**
             * Returns shipping rates for address
             * @returns void
             */
            getEstimationInfo: function () {
                var addressData = null;

                this.source.set('params.invalid', false);
                this.source.trigger('shippingAddress.data.validate');

                if (!this.source.get('params.invalid')) {
                    addressData = this.source.get('shippingAddress');
                    selectShippingAddress(addressConverter.formAddressDataToQuoteAddress(addressData));
                }
            }
        });
    }
);
