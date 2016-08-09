'use strict';

angular.module('echo.filters.onOff', [])
  .filter('onOff', function () {
    return function (flag) {
      return flag ? 'On' : 'Off';
    };
  });