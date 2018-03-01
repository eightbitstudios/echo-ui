'use strict';

describe('Filter - Show more filter', function () {
  var showMore;

  beforeEach(function () {
    module('echo.filters.showMore');

    inject(function ($filter) {
      showMore = $filter('showMore');
    });
  });

  it('should return empty string if no records', function () {
    var paging = {
      totalRecords: 0,
      offset: 1,
      limit: 10
    };

    expect(showMore(paging)).toEqual('');
  });

  it('should return empty string if no more records', function () {
    var paging = {
      totalRecords: 10,
      offset: 1,
      limit: 10
    };

    expect(showMore(paging)).toEqual('');
  });

  it('should return [limit] records if multiple pages remain', function () {
    var paging = {
      totalRecords: 30,
      offset: 1,
      limit: 10
    };

    expect(showMore(paging)).toEqual('Show 10 more Loads');
  });

  it('should return [limit] records if multiple pages remain with offset', function () {
    var paging = {
      totalRecords: 30,
      offset: 11,
      limit: 10
    };

    expect(showMore(paging)).toEqual('Show 10 more Loads');
  });

  it('should return less than [limit] records if last page available and less than limit remain', function () {
    var paging = {
      totalRecords: 35,
      offset: 21,
      limit: 10
    };

    expect(showMore(paging)).toEqual('Show 5 more Loads');
  });

  it('should return empty string if last page', function () {
    var paging = {
      totalRecords: 35,
      offset: 31,
      limit: 10
    };

    expect(showMore(paging)).toEqual('');
  });
});
