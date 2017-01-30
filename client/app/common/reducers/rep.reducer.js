angular.module('echo.reducers.rep', [
    'echo.action'
  ])
  .factory('repReducer', function(repActions) {
    var reducer = function(state, action) {
      switch (action.type) {
        case repActions.SET_REP:
          return action.payload;
        default:
          return state;
      }
    };

    return reducer;
  });