'use strict';

describe('Filter - Report Date filter', function () {
  var reportDate,
    moment,
    dateCompare;

  beforeEach(function () {
    module('echo.filters.reportDate', function ($provide) {
      $provide.constant('moment', moment = jasmine.createSpy());
    });

    inject(function ($filter) {
      reportDate = $filter('reportDate');
    });

    moment.and.returnValue(dateCompare = jasmine.createSpyObj('dateCompare', ['isSame']));
  });

  it('should return today if both dates are the same', function () {
    dateCompare.isSame.and.returnValue(true);
    expect(reportDate('')).toEqual(' Today');
  });

  it('should not return today if dates are not the same', function () {
    dateCompare.isSame.and.returnValue(false);
    expect(reportDate('')).toEqual('');
  });
});
