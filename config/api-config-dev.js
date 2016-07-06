'use strict';

module.exports = function (grunt) {
  return {
    configurationsEndpoint: 'mock/api/configurations',
    loadEntryEndpoint: '/mock/api/load-entry',
    itemTypeAheadEndpoint: '/mock/api/typeahead',
    referenceNumbersEndpoint: '/mock/api/referencenumbers',
    addressVerificationEndpoint: '//shipperportal/address/validate',
    carriersEndpoint: '/mock/api/carriers',
    warehousesEndpoint: '/mock/api/warehouses'
  }
};
