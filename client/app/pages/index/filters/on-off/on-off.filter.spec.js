'use strict';

describe('Filter - On off filter', function () {
  var onOff;

  beforeEach(function () {
    module('echo.filters.onOff');

    inject(function ($filter) {
      onOff = $filter('onOff');
    });
  });

  it('should return On if true', function () {
    expect(onOff(true)).toEqual('On');
  });

  it('should return Off if false', function () {
    expect(onOff(false)).toEqual('Off');
  });
});
