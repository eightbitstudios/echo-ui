'use strict';

describe('Filter - Phone number filter', function () {
  var phoneNumber;

  beforeEach(function () {
    module('echo.filters.phoneNumber');

    inject(function ($filter) {
      phoneNumber = $filter('phoneNumber');
    });
  });

  it('should be empty if no phone number is provided', function () {
    expect(phoneNumber()).toEqual('');
  });

  it('should truncate phone number', function () {
    expect(phoneNumber('1234567891')).toEqual('123-456-7891');
  });

  it('should truncate phone number', function () {
    expect(phoneNumber('11234567891')).toEqual('123-456-7891');
  });
});
