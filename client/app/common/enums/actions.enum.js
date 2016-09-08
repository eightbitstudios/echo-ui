angular.module('echo.enums.actions', [])
  .constant('actionEnums', {
    REPORTED_BOOKED: {
      description: 'Reported Booked',
      value: 0
    },
    REPORTED_EMPTY: {
      description: 'Reported empty',
      value: 1
    },
    REPORTED_ARRIVAL_AT_PICKUP: {
      description: 'Report Arrival At Pickup',
      value: 2
    },
    SENT_LOAD_UPDATE: {
      description: 'Send Load Update',
      value: 3
    }
  });
