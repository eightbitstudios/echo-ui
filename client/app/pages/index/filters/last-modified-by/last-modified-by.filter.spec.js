'use strict';

describe('Filter - Last Modified By', function () {
  var lastModifiedBy;

  beforeEach(function () {
    module('echo.filters.lastModifiedBy');

    inject(function ($filter) {
      lastModifiedBy = $filter('lastModifiedBy');
    });
  });

  it('should return formated user name', function () {
    expect(lastModifiedBy({
      firstName: 'Test',
      lastName: 'Tester'
      })).toEqual('By Test T.');
  });

  it('should return formatted date', function () {
    expect(lastModifiedBy({
      actionPerformedOn: 'Tues, May 10'
      })).toEqual('Tues, May 10');
  });

  it('should return formatted name and date', function () {
    expect(lastModifiedBy({
      firstName: 'Test',
      lastName: 'Tester',
      actionPerformedOn: 'Tues, May 10'
      })).toEqual('By Test T. at Tues, May 10');
  });
});
