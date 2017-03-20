'use strict';

angular.module('echo.filters.datePicker', [
  'echo.config.globals'
])
  .filter('datePicker', function (moment) {
    return function (date) {
      return moment(date || undefined).format('ddd, MMM DD'); // Moment return invalid date for null and today for undefined. We want to return today if the date isn't set.
    };
  });

