'use strict';

angular.module('echo.filters.reportDate', [
  'echo.config.globals'
])
  .filter('reportDate', function ($filter, moment) {
    return function (dateTime) {
      var formattedReportDate = '';
      
      if (moment().isSame(moment(dateTime), 'days')) {
        formattedReportDate = $filter('date')(dateTime, 'HH:mm CST') + ' Today';
      } else {
        formattedReportDate = $filter('date')(dateTime, 'HH:mm CST EEE, MMM d');
      }

      return formattedReportDate;

    };
  });