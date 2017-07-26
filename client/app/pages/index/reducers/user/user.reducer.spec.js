describe('Reducer: user', function() {
  'use strict';

  var userReducer, userActions;

  beforeEach(function() {
    module('echo.reducers.user');
    inject(function(_userReducer_, _userActions_) {
      userReducer = _userReducer_;
      userActions = _userActions_;
    });
  });

  it('should return payload when setting a user', function() {
    var state = {},
      action = {
        type: userActions.SET_USER,
        payload: {
          userId: 1
        }
      };

    expect(userReducer(state, action)).toEqual(action.payload);
  });

  it('should return the current state if no action is provided', function() {
    var state = {
        userId: 1
      },
      action = {
        payload: {}
      };

    expect(userReducer(state, action)).toEqual(state);
  });
});