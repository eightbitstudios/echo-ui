angular.module('echo.enums.loadUpdateOptions', [])
  .constant('loadUpdateOptionEnums', {
    LOCATION: {
      description: 'Location',
      value: 0,
      typeFlag: 'LOCATION'
    },
    TRAILER_DROP: {
      description: 'Trailer Drop at Yard',
      value: 1,
      typeFlag: 'DROP'
    },
    TRAILER_PICKUP: {
      description: 'Trailer Pickup at Yard',
      value: 2,
      typeFlag: 'PICKUP'
    },
    ARRIVAL_AT_DELIVERY: {
      description: 'Arrival at Delivery',
      value: 3,
      typeFlag: 'DELIVERY'
    }
  });
