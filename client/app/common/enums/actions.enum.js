angular.module('echo.enums.actions', [])
  .constant('actionEnums', {
    REPORTED_START: {
      description: 'Reported Start',
      value: 0
    },
    REPORTED_EMPTY: {
      description: 'Reported empty',
      value: 1
    }
  });
