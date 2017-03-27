describe('Reducer: rep', function() {
  'use strict';

  var repReducer, repActions;

  beforeEach(function() {
    module('echo.reducers.rep');
    inject(function(_repReducer_, _repActions_) {
      repReducer = _repReducer_;
      repActions = _repActions_;
    });
  });

  it('should return payload when setting a rep', function() {
    var state = {},
      action = {
        type: repActions.SET_REP,
        payload: {
          repId: 1
        }
      };

    expect(repReducer(state, action)).toEqual(action.payload);
  });

  it('should clear state when removing rep', function() {
    var state = {
        repId: 1
      },
      action = {
        type: repActions.CLEAR_REP,
        payload: {}
      };

    expect(repReducer(state, action)).toEqual({});
  });

  it('should return the current state if no action is provided', function() {
    var state = {
        repId: 1
      },
      action = {
        payload: {}
      };

    expect(repReducer(state, action)).toEqual(state);
  });
});