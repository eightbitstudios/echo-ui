'use strict';

describe('Filter - Paging filter', function () {
  var paging;

  beforeEach(function () {
    module('echo.filters.paging');

    inject(function ($filter) {
      paging = $filter('paging');
    });
  });

  it('should return a valid string for pagination', function () {
    expect(paging({offset: 0, recordCount: 5, totalRecords: 30}, 'Drivers')).toEqual('Showing 1-5 of 30 Drivers');
  });
});
