'use strict';

angular.module('echo.filters.driverStatus', [])
  .filter('driverStatus', function () {
    return function (flag) {
      return flag ? 'Do Not Disturb' : 'Active Driver';
    };
  });