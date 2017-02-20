/**
 * @description Reducers define how the applications state will change based on an action.
 */
angular.module('echo.reducers', [
  'echo.reducers.loadCount',
  'echo.reducers.user',
  'echo.reducers.carrier',
  'echo.reducers.rep',
  'echo.reducers.invoiceCount'
]).factory('combineReducers', function() {
  /**
   * @description Bundles reducers together into a single reducer. This allows us to split up our reducers into
   * multiple modules. This is called by the application store when an action is dispatched.
   * @reference http://redux.js.org/docs/api/combineReducers.html
   */
  return  function (reducersObject) {
    var keys = _.keys(reducersObject);
    return function(state, action) {
      return _.reduce(keys, function(currState, key) {
        var reducer = reducersObject[key]; // Grab reducer based on the reducer object.
        var obj = {};
        obj[key] = reducer(currState[key], action); // Call reducer with application state and action dispatched.
        return _.assign(currState, obj); // Updated application state
      }, state);
    };
  };
});
