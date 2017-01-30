angular.module('echo.store', [
  'echo.action',
  'echo.reducers',
  'echo.actions.actionDispatcher'
]).factory('store$', function(combineReducers, action$, loadCountReducer, userReducer,
  carrierReducer, repReducer, actionDispatcher) {

  function Store() {
    var that = this;

    var initState = {
      loadCounts: {},
      user: {},
      carrier: {},
      rep: {}
    };

    // Reduxification
    that._store$ = action$
      .startWith(initState)
      .scan(combineReducers({
        loadCounts: loadCountReducer,
        user: userReducer,
        carrier: carrierReducer,
        rep: repReducer
      }));

    that._store$.subscribe(function(state) {
      that._state = state;
    });
  }

  Store.prototype.subscribe = function(callback) {
    return this._store$.subscribe(callback);
  };

  Store.prototype.dispatch = function(action) {
    actionDispatcher(action);
  };

  Store.prototype.getState = function() {
    return this._state;
  };

  return new Store();
});