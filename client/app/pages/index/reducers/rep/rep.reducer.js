angular.module('echo.reducers.rep', [
    'echo.actions'
  ])
  .factory('repReducer', function(repActions) {
    var reducer = function(state, action) {
      switch (action.type) {
        case repActions.SET_REP:
          return action.payload;
        case repActions.CLEAR_REP:
          return {};
        default:
          return state;
      }
    };
    return reducer;
  });