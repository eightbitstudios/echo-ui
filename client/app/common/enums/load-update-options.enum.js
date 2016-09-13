angular.module('echo.enums.loadUpdateOptions', ['echo.enums.actions'])
  .factory('loadUpdateOptionEnums', function (actionEnums) {
    return {
      LOCATION: {
        description: 'Location',
        value: actionEnums.AVAILABLE_ACTIONS.REPORT_LOCATION.value,
        typeFlag: 'LOCATION'
      },
      TRAILER_DROP: {
        description: 'Trailer Drop at Yard',
        value: actionEnums.AVAILABLE_ACTIONS.TRAILER_DROP_AT_YARD.value,
        typeFlag: 'DROP'
      },
      TRAILER_PICKUP: {
        description: 'Trailer Pickup at Yard',
        value: actionEnums.AVAILABLE_ACTIONS.TRAILER_PICKUP_AT_YARD.value,
        typeFlag: 'PICKUP'
      },
      ARRIVAL_AT_DELIVERY: {
        description: 'Arrival at Delivery',
        value: actionEnums.AVAILABLE_ACTIONS.REPORT_ARRIVED_AT_DELIVERY.value,
        typeFlag: 'DELIVERY'
      }
    };
  });
