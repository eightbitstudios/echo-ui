'use strict';

describe('Filter - Date picker filter', function () {
  var datePicker;

  beforeEach(function () {
    module('echo.filters.datePicker');

    inject(function ($filter) {
      datePicker = $filter('datePicker');
    });
  });

  it('should return today if empty', function () {
    expect(datePicker(null)).toBeDefined();
  });

  it('should return Tue, Sep 20', function () {
    expect(datePicker('2016-09-20T12:00:00')).toEqual('Tue, Sep 20');
  });

  it('should return Tue, Jul 04', function () {
    expect(datePicker('2017-07-04T12:00:00')).toEqual('Tue, Jul 04');
  });

  it('should return Thu, Jan 01', function () {
    expect(datePicker('2015-01-01T12:00:00')).toEqual('Thu, Jan 01');
  });
});
