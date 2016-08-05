'use strict';

angular.module('echo.filters.shippingDate', [
  'echo.config.globals'
])
  .filter('shippingDate', function ($filter, moment) {
    return function (dateTime) {
      var formattedShippingDate = '';

      if (moment().isSame(moment(dateTime), 'days')) {
        formattedShippingDate = 'Today' + $filter('date')(dateTime, ', MMM d');
      } else {
        formattedShippingDate = 'Picked Up ' + $filter('date')(dateTime, 'EEE, MMM d');
      }

      return formattedShippingDate;

    };
  });