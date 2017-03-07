'use strict';

describe('Filter - Phone number filter', function () {
  var phoneNumber;

  beforeEach(function () {
    module('echo.filters.phoneNumber');

    inject(function ($filter) {
      phoneNumber = $filter('phoneNumber');
    });
  });

  it('should truncate phone number', function () {
    expect(phoneNumber('1234567891')).toEqual('123-456-7891');
  });

  it('should truncate phone number', function () {
    expect(phoneNumber('11234567891')).toEqual('123-456-7891');
  });
});
