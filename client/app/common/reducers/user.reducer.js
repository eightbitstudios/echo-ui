angular.module('echo.reducers.user', [
  'echo.action',
  'echo.models.user'
])
.factory('userReducer', function(userActions) {
  var reducer = function(state, action) {
    switch (action.type) {
      case userActions.SET_USER: 
          return action.payload;
      default: return state;
    }
  };

  return reducer;
});