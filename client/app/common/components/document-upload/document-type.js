angular.module('echo.components.documentTypes', [])
  .constant('documentTypes', {
    POD: 'POD',
    LUMPER_RECEIPT: 'Lumper Receipt',
    BILL_OF_LADING: 'Bill of Lading',
    FUEL_RECEIPT: 'Fuel Receipts',
    SCALE_TICKETS: 'Scale Tickets',
    OTHER: 'Other'
  });