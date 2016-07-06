'use strict';

module.exports = function (grunt) {
  return {
    configurationsEndpoint: 'mock/api/configurations?CustomerGuid=00000000-0000-0000-0000-000000000000',
    loadEntryEndpoint: '/mock/api/load-entry',
    itemTypeAheadEndpoint: '/mock/api/typeahead',
    referenceNumbersEndpoint: 'http://shipperportal:82/reference-numbers?CustomerId=00000000-0000-0000-0000-000000000000',
    addressVerificationEndpoint: '//shipperportal/address/validate',
    carriersEndpoint: '/mock/api/carriers',
    warehousesEndpoint: '/mock/api/warehouses'
  };
};
