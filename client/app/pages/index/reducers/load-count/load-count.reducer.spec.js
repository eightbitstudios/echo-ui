describe('Reducer: loadCount', function() {
  'use strict';

  var loadCountReducer, loadCountsActions;

  beforeEach(function() {
    module('echo.reducers.loadCount');
    inject(function(_loadCountReducer_, _loadCountsActions_) {
      loadCountReducer = _loadCountReducer_;
      loadCountsActions = _loadCountsActions_;
    });
  });

  it('should return payload when setting a load count', function() {
    var state = {},
      action = {
        type: loadCountsActions.LOAD_COUNTS_LOADED,
        payload: {
          count: 1
        }
      };

    expect(loadCountReducer(state, action)).toEqual(action.payload);
  });

  it('should clear state when removing load count', function() {
    var state = {
        count: 1
      },
      action = {
        type: loadCountsActions.CLEAR_LOAD_COUNTS,
        payload: {}
      };

    expect(loadCountReducer(state, action)).toEqual({});
  });

  it('should return the current state if no action is provided', function() {
    var state = {
        count: 1
      },
      action = {
        payload: {}
      };

    expect(loadCountReducer(state, action)).toEqual(state);
  });
});