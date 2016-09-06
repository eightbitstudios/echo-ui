angular.module('echo.enums.actions', [])
  .constant('actionEnums', {
    REPORTED_START: {
      description: 'Reported Start',
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
    REPORT_LOADED: {
      description: 'Report Loaded',
      value: 3
    }
  });
