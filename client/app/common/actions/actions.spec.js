describe('Action: action$', function() {
  'use strict';

  var action$,
    Rx;

  beforeEach(function() {
    module('echo.actions', function($provide) {
      $provide.constant('Rx', Rx = jasmine.createSpyObj('Rx', ['Subject']));
    });

    inject(function(_action$_) {
      action$ = _action$_;
    });
  });

  it('should return a Rx Subject', function() {
    expect(Rx.Subject).toHaveBeenCalled();
  });
});