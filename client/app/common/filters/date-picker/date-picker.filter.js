'use strict';

angular.module('echo.filters.datePicker', [
  'echo.config.globals'
])
  .filter('datePicker', function (moment) {
    return function (date) {
      return moment(date).format('ddd, MMM DD');
    };
  });