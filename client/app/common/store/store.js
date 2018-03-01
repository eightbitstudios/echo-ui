/**
 * @description This structure follows the redux pattern:
 * http://redux.js.org/docs/introduction/CoreConcepts.html
 */

angular.module('echo.store', [
  'echo.actions',
  'echo.reducers',
  'echo.actions.actionDispatcher'
]).factory('store$', function($rootScope, combineReducers, action$, loadCountReducer, userReducer,
  carrierReducer, repReducer, invoiceCountReducer, actionDispatcher) {

  /**
   * @description Holds the whole state tree of the application
   */
  function Store() {
    var that = this;

    var initState = {
      loadCounts: {},
      user: {},
      carrier: {},
      rep: {},
      invoiceCounts: {}
    };
    
    // Reduxification
    that._store$ = action$
      .startWith(initState) // Call reducers with initState
      .scan(combineReducers({ // Calls all reducers when an observer notifies store.
        loadCounts: loadCountReducer,
        user: userReducer,
        carrier: carrierReducer,
        rep: repReducer,
        invoiceCounts: invoiceCountReducer
      }));

    that._store$.subscribe(function(state) {
      that._state = state;
    });
  }

  /**
   * @description Listen to any state changes to the tree
   * @
   */
  Store.prototype.subscribe = function(callback) {
    return this._store$.subscribe(function(value) {
      // Observables don't trigger a digest cycle so we do it manually if a value is changed in the store.
      if ($rootScope.$$phase) { // Don't trigger another digest cycle if one is in phase.
        callback(value);
      } else {
        $rootScope.$apply(function() { // Manually trigger digest cycle.
          callback(value);
        });
      }
    });
  };

  /**
   * @description Dispatch an action to change the state of the tree
   * @param {Object} action - Action to dispatch
   */
  Store.prototype.dispatch = function(action) {
    actionDispatcher(action);
  };

  /**
   * @description Get application state tree
   * @returns {Object} State
   */
  Store.prototype.getState = function() {
    return this._state;
  };

  return new Store(); // Create application store
});
