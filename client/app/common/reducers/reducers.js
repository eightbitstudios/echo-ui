angular.module('echo.reducers', [
  'echo.reducers.loadCount',
  'echo.reducers.user',
  'echo.reducers.carrier',
  'echo.reducers.rep'
]).factory('combineReducers', function() {
  return  function (reducersObject) {
    var keys = _.keys(reducersObject);
    return function(state, action) {
      return _.reduce(keys, function(currState, key) {
        var reducer = reducersObject[key];
        var obj = {};
        obj[key] = reducer(currState[key], action);
        return _.assign(currState, obj);
      }, state);
    };
  };
});