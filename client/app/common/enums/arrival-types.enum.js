angular.module('echo.enums.arrivalTypes', [])
  .constant('arrivalTypeEnums', {
    PICKUP: {
      description: 'PICKUP',
      value: 0
    },
    DELIVERY: {
      description: 'DELIVERY',
      value: 1
    }
  });
