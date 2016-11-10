'use strict';

angular.module('echo.filters.datePicker', [
  'echo.config.globals'
])
  .filter('datePicker', function (moment) {
    return function (date, minDate) {
      return moment(date || minDate).format('ddd, MMM DD');
    };
  });