'use strict';

angular.module('echo.filters.datePicker', [
  'echo.config.globals'
])
  .filter('datePicker', function (moment) {
    return function (date, minDate) {
      if(date) {
        return moment(date).format('ddd, MMM DD');
      } else if(minDate) {
        return moment(minDate, 'MM/DD/YYYY HH:mm:ss').format('ddd, MMM DD');
      } else {
        return moment();
      }
      
    };
  });