'use strict';

angular.module('echo.filters.firstCharacter', [])
  .filter('firstCharacter', function () {
    return function (text) {
      var firstCharacter = '';
      if(_.isString(text)) {
        firstCharacter = (text).charAt(0);
      }
      return firstCharacter;
    };
  });