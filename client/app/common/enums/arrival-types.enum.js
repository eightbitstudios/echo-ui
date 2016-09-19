angular.module('echo.enums.arrivalTypes', [])
  .constant('arrivalTypeEnums', {
    PICKUP: {
      description: 'pickup',
      value: 0
    },
    DELIVERY: {
      description: 'delivery',
      value: 1
    }
  });
