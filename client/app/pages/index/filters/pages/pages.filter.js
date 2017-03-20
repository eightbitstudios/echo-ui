'use strict';

angular.module('echo.filters.pages', [])
  .filter('pages', function() {
    return function(count) {
      return _.template('Page ${pageCount}')({
        pageCount: ++count
      });
    };
  });