'use strict';

describe('Filter - Phone number filter', function () {
  var phoneNumber;

  beforeEach(function () {
    module('echo.filters.phoneNumber');

    inject(function ($filter) {
      phoneNumber = $filter('phoneNumber');
    });
  });

  it('should format area code', function () {
    expect(phoneNumber('123')).toEqual('(123');
  });

  it('should format area code and start of number', function () {
    expect(phoneNumber('123) 4')).toEqual('(123) 4');
  });

  it('should format full phone number', function () {
    expect(phoneNumber('1234567890')).toEqual('(123) 456-7890');
  });

  it('should truncate phone number', function () {
    expect(phoneNumber('12345678910')).toEqual('(123) 456-7891');
  });
});
