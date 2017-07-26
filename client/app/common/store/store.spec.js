describe('Store: store$', function() {
  'use strict';

  var action$,
    combineReducers,
    loadCountReducer,
    userReducer,
    carrierReducer,
    repReducer,
    invoiceCountReducer,
    actionDispatcher,
    $rootScope,
    store$,
    startWith,
    storeStream;

  beforeEach(function() {
    module('echo.store', function($provide) {
      $provide.value('$rootScope', $rootScope = jasmine.createSpyObj('$rootScope', ['$apply']));
      $provide.value('combineReducers', combineReducers = jasmine.createSpy('combineReducers'));
      $provide.value('action$', action$ = jasmine.createSpyObj('action$', ['startWith']));
      $provide.value('loadCountReducer', loadCountReducer = jasmine.createSpy('loadCountReducer'));
      $provide.value('userReducer', userReducer = jasmine.createSpy('userReducer'));
      $provide.value('carrierReducer', carrierReducer = jasmine.createSpy('carrierReducer'));
      $provide.value('repReducer', repReducer = jasmine.createSpy('repReducer'));
      $provide.value('invoiceCountReducer', invoiceCountReducer = jasmine.createSpy('invoiceCountReducer'));
      $provide.value('actionDispatcher', actionDispatcher = jasmine.createSpy('actionDispatcher'));

      action$.startWith.and.returnValue(startWith = jasmine.createSpyObj('startWith', ['scan']));
      startWith.scan.and.returnValue(storeStream = jasmine.createSpyObj('storeStream', ['subscribe']));
    });

    inject(function(_store$_) {
      store$ = _store$_;
    });
  });

  describe('Function: constructor', function() {
    it('should start with initial store state', function() {
      expect(action$.startWith).toHaveBeenCalledWith({
        loadCounts: {},
        user: {},
        carrier: {},
        rep: {},
        invoiceCounts: {}
      });
    });

    it('should subscribe to store event stream', function() {
      expect(storeStream.subscribe).toHaveBeenCalled();
    });

    it('should update store state on event stream update', function() {
      var state = {
        loadCounts: {},
        user: {},
        carrier: {},
        rep: {},
        invoiceCounts: {}
      };
      storeStream.subscribe.calls.argsFor(0)[0](state);
      expect(store$._state).toEqual(state);
    });

    it('should combine reducers', function() {
      expect(combineReducers).toHaveBeenCalledWith({
        loadCounts: loadCountReducer,
        user: userReducer,
        carrier: carrierReducer,
        rep: repReducer,
        invoiceCounts: invoiceCountReducer
      });
    });
  });

  describe('Function: subscribe', function() {
    it('should subscribe to store stream', function() {
      store$.subscribe();

      expect(storeStream.subscribe).toHaveBeenCalled();
    });

    it('should subscribe to store stream', function() {
      var callback = _.noop;
      store$.subscribe(callback);

      expect(storeStream.subscribe).toHaveBeenCalled();
    });

    it('should pass observer data to callback', function() {
      var callback = jasmine.createSpy('callback'),
        data = {
          id: 1
        };

      $rootScope.$$phase = true;
      store$.subscribe(callback);
      storeStream.subscribe.calls.argsFor(1)[0](data);
      expect(callback).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(data);
    });

    it('should call digest cycle if one is happening', function() {
      var callback = jasmine.createSpy('callback'),
        data = {
          id: 1
        };

      $rootScope.$$phase = false;
      store$.subscribe(callback);
      storeStream.subscribe.calls.argsFor(1)[0](data);
      expect($rootScope.$apply).toHaveBeenCalled();
      $rootScope.$apply.calls.argsFor(0)[0]();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe('Function: dispatch', function() {
    it('should call action dispatcher', function() {
      var action = {
        type: 'ACTION',
        payload: 3
      };

      store$.dispatch(action);

      expect(actionDispatcher).toHaveBeenCalledWith(action);
    });
  });

  describe('Function: getState', function() {
    it('should get store state', function() {
      var state = {
        loadCounts: {},
        user: {},
        carrier: {},
        rep: {},
        invoiceCounts: {}
      };

      store$._state = state;
      expect(store$.getState()).toEqual(state);
    });
  });
});