angular.module('echo.enums.loadUpdateOptions', [])
  .constant('loadUpdateOptionEnums', {
    LOCATION: {
      description: 'Location',
      value: 0
    },
    TRAILER_DROP: {
      description: 'Trailer Drop at Yard',
      value: 1
    },
    TRAILER_PICKUP: {
      description: 'Trailer Pickup at Yard',
      value: 2
    },
    ARRIVAL_AT_DELIVERY: {
      description: 'Arrival at Delivery',
      value: 3
    }
  });
