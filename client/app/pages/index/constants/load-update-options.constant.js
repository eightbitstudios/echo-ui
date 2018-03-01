angular.module('echo.constants.loadUpdateOptions', ['echo.constants.actions'])
  .factory('loadUpdateOptionConstants', function (actionConstants) {
    return {
      LOCATION: {
        description: 'Location',
        value: actionConstants.AVAILABLE_ACTIONS.REPORT_LOCATION.value,
        typeFlag: 'LOCATION'
      },
      TRAILER_DROP: {
        description: 'Trailer Drop at Yard',
        value: actionConstants.AVAILABLE_ACTIONS.TRAILER_DROP_AT_YARD.value,
        typeFlag: 'DROP'
      },
      TRAILER_PICKUP: {
        description: 'Trailer Pickup at Yard',
        value: actionConstants.AVAILABLE_ACTIONS.TRAILER_PICKUP_AT_YARD.value,
        typeFlag: 'PICKUP'
      },
      ARRIVAL_AT_DELIVERY: {
        description: 'Arrival at Delivery',
        value: actionConstants.AVAILABLE_ACTIONS.REPORT_ARRIVAL_AT_DELIVERY.value,
        typeFlag: 'DELIVERY'
      }
    };
  });
