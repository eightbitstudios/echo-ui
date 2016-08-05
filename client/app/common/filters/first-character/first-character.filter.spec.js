'use strict';

describe('Filter - First character filter', function () {
  var firstCharacter;

  beforeEach(function () {
    module('echo.filters.firstCharacter');

    inject(function ($filter) {
      firstCharacter = $filter('firstCharacter');
    });
  });

  it('should handle empty string', function () {
    expect(firstCharacter('')).toEqual('');
  });

  it('should get first character in string', function () {
    expect(firstCharacter('Test')).toEqual('T');
  });
});
