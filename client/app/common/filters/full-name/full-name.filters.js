'use strict';

angular.module('echo.filters.fullName', [])
  .filter('fullName', function () {
    return function (model) {

      return _.join([model.firstName, model.lastName], ' ');
    };
  });