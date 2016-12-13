'use strict';

angular.module('echo.filters.documentType', [])
  .filter('documentType', function () {
    return function (documentTypeId) {
      var documentMapping = {
        1: 'Bill of Lading',
        2: 'Other',
        3: 'Lumper Receipt',
        4: 'Proof of Delivery',
        5: 'Scale Tickets',
        6: 'Invoice',
        7: 'Fuel Receipts',
        8: 'Rate Confirmation',
      };

      return documentMapping[documentTypeId] || '';
    };
  });