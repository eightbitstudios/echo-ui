'use strict';

angular.module('echo.filters.pages', [])
  .filter('pages', function() {
    return function(file, files) {
      var template = '';

      var previousPageCount = _.sumBy(_.slice(files, 0, _.indexOf(files, file)), 'pageCount');

      if (file.pageCount > 1) {
        template = _.template('Pages ${start} - ${end}')({
          start: ++previousPageCount,
          end: previousPageCount + file.pageCount - 1
        });
      } else {
        template = _.template('Page ${pageCount}')({
          pageCount: file.pageCount + previousPageCount
        });
      }
      return template;
    };
  });