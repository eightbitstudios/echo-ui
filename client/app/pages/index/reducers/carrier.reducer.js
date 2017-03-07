angular.module('echo.reducers.carrier', [
    'echo.action'
  ])
  .factory('carrierReducer', function(carrierActions) {
    var reducer = function(state, action) {
      switch (action.type) {
        case carrierActions.SET_CARRIER:
          return action.payload;
        case carrierActions.CLEAR_CARRIER:
          return {};
        default:
          return state;
      }
    };
    return reducer;
  });