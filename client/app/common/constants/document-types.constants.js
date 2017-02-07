angular.module('echo.constants.documentTypes', [])
  .constant('documentTypes', {
    BILL_OF_LADING: {
      description: 'Bill of Lading',
      value: 'Bill of Lading'
    },
    OTHER: {
      description: 'Other',
      value: 'Other'
    },
    LUMPER_RECEIPT: {
      description: 'Lumper Receipt',
      value: 'Lumper Receipt'
    },
    POD: {
      description: _.template('Proof of Delivery #${documentNumber}'),
      value: 'Proof of Delivery'
    },
    SCALE_TICKETS: {
      description: 'Scale Tickets',
      value: 'Scale Tickets'
    },
    INVOICE: {
      description: 'Invoice',
      value: 'Invoice'
    },
    FUEL_RECEIPT: {
      description: 'Fuel Receipts',
      value: 'Fuel Receipts'
    },
    RATE_CONFIRMATION: {
      description: 'Rate Confirmation',
      value: 8
    }
  });