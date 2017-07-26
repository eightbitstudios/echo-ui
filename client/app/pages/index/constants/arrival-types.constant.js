angular.module('echo.constants.arrivalTypes', [])
  .constant('arrivalTypeConstants', {
    PICKUP: {
      description: 'pickup',
      value: 0
    },
    DELIVERY: {
      description: 'delivery',
      value: 1
    }
  });
