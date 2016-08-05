'use strict';

describe('Filter - Shipping Date filter', function () {
  var shippingDate,
    moment,
    dateCompare;

  beforeEach(function () {
    module('echo.filters.shippingDate', function ($provide) {
      $provide.constant('moment', moment = jasmine.createSpy());
    });

    inject(function ($filter) {
      shippingDate = $filter('shippingDate');
    });

    moment.and.returnValue(dateCompare = jasmine.createSpyObj('dateCompare', ['isSame']));
  });

  it('should return today if both dates are the same', function () {
    dateCompare.isSame.and.returnValue(true);
    expect(shippingDate('')).toEqual('Today ');
  });

  it('should not return today if dates are not the same', function () {
    dateCompare.isSame.and.returnValue(false);
    expect(shippingDate('')).toEqual('Picked Up ');
  });
});
