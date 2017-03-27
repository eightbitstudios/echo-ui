describe('Action: actionDispatcher', function() {
  'use strict';

  var action$,
    actionDispatcher,
    args,
    Rx;

  beforeEach(function() {
    module('echo.actions.actionDispatcher', function($provide) {
      $provide.constant('Rx', Rx = {
        Observable: jasmine.createSpyObj('Observable', ['isObservable'])
      });
      $provide.value('action$', action$ = jasmine.createSpyObj('action$', ['onNext']));
    });

    inject(function(_actionDispatcher_) {
      actionDispatcher = _actionDispatcher_;
      args = {
        payload: {
          source: jasmine.createSpyObj('source', ['subscribe'])
        }
      };
    });
  });

  it('should provide observer with new data', function() {
    Rx.Observable.isObservable.and.returnValue(false);
    actionDispatcher(args);
    expect(action$.onNext).toHaveBeenCalledWith(args);
  });

  it('should subscribe to observable argument', function() {
    Rx.Observable.isObservable.and.returnValue(true);
    actionDispatcher(args);

    expect(args.payload.source.subscribe).toHaveBeenCalled();
  });

  it('should send observer data once subscriber is done', function() {
    var callback = null,
    data = {
      id: 1
    };

    Rx.Observable.isObservable.and.returnValue(true);
    args.payload.source.subscribe = function(sub) {
      callback = sub;
    };
    actionDispatcher(args);
    callback(data);
    expect(action$.onNext).toHaveBeenCalledWith(data);
  });
});