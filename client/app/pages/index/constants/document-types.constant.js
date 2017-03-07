angular.module('echo.constants.documentTypeConstants', [])
  .constant('documentTypeConstants', {
    BILL_OF_LADING: {
      description: 'Bill of Lading',
      value: 1
    },
    FUEL_RECEIPT: {
      description: 'Fuel Receipts',
      value: 2
    },
    LUMPER_RECEIPT: {
      description: 'Lumper Receipt',
      value: 3
    },
    POD: {
      description: _.template('Proof of Delivery #${documentNumber}'),
      value: 4
    },
    SCALE_TICKETS: {
      description: 'Scale Tickets',
      value: 5
    },
    INVOICE: {
      description: 'Invoice',
      value: 6
    },
    OTHER: {
      description: 'Other',
      value: 7
    },
    RATE_CONFIRMATION: {
      description: 'Rate Confirmation',
      value: 8
    }
  });