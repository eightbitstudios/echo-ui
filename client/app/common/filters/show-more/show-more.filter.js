'use strict';

angular.module('echo.filters.showMore', [])
  .filter('showMore', function () {
    return function (paging) {
      var showMore = '';

      var count = (paging.totalRecords - (paging.offset + paging.limit));

      if (count > 0) {
        showMore = _.template('Show more ${count} Loads')({
          count: Math.min(paging.limit, (paging.totalRecords - (paging.offset + paging.limit)))
        });
      }

      return showMore;

    };
  });