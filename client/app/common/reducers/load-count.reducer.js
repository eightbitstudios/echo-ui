angular.module('echo.reducers.loadCount', [
    'echo.action',
    'echo.api.loads'
  ])
  .factory('loadCountReducer', function(loadCountsActions) {
    var reducer = function(state, action) {
      switch (action.type) {
        case loadCountsActions.LOAD_COUNTS_LOADED:
          return action.payload;
        case loadCountsActions.CLEAR_LOAD_COUNTS:
          return {};
        default:
          return state;
      }
    };

    return reducer;
  });