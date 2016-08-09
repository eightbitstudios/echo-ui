'use strict';

describe('Filter - Driver status filter', function () {
  var driverStatus;

  beforeEach(function () {
    module('echo.filters.driverStatus');

    inject(function ($filter) {
      driverStatus = $filter('driverStatus');
    });
  });

  it('should return "Do Not Disturb" if true', function () {
    expect(driverStatus(true)).toEqual('Do Not Disturb');
  });

  it('should return "Active Driver" if false', function () {
    expect(driverStatus(false)).toEqual('Active Driver');
  });
});
