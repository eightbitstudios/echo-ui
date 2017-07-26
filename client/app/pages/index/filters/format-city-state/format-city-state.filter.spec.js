'use strict';

describe('Filter - Format city/state filter', function () {
  var formatCityState;

  beforeEach(function () {
    module('echo.filters.formatCityState');

    inject(function ($filter) {
      formatCityState = $filter('formatCityState');
    });
  });

  it('should return empty string if null address', function () {
    expect(formatCityState(null)).toEqual('');
  });

  it('should return empty string if empty address', function () {
    expect(formatCityState({})).toEqual('');
  });

  it('should return city if only city', function () {
    var city = 'Chicago';
    expect(formatCityState({ city: city })).toEqual('Chicago');
  });

  it('should return state if only state', function () {
    var state = 'IL';
    expect(formatCityState({ state: state })).toEqual('IL');
  });

  it('should return "[city], [state]" if city and state present', function () {
    var city = 'Chicago',
      state = 'IL';
    expect(formatCityState({ city: city, state: state })).toEqual('Chicago, IL');
  });
});
