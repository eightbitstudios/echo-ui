'use strict';

angular.module('echo.filters.showMore', [])
  .filter('showMore', function () {
    return function (paging) {
      var showMore = '';

      var count =  (paging.totalRecords - (paging.offset + paging.limit) + 1);

      if (count > 0) {
        showMore = _.template('Show ${count} more Loads')({
          count: Math.min(paging.limit, count)
        });
      }

      return showMore;

    };
  });