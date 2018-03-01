describe('Reducer: carrier', function() {
  'use strict';

  var carrierReducer, carrierActions;

  beforeEach(function() {
    module('echo.reducers.carrier');
    inject(function(_carrierReducer_, _carrierActions_) {
      carrierReducer = _carrierReducer_;
      carrierActions = _carrierActions_;
    });
  });

  it('should return payload when setting a carrier', function() {
    var state = {},
      action = {
        type: carrierActions.SET_CARRIER,
        payload: {
          carrierId: 1
        }
      };

    expect(carrierReducer(state, action)).toEqual(action.payload);
  });

  it('should clear state when removing carrier', function() {
    var state = {
        carrierId: 1
      },
      action = {
        type: carrierActions.CLEAR_CARRIER,
        payload: {}
      };

    expect(carrierReducer(state, action)).toEqual({});
  });

  it('should return the current state if no action is provided', function() {
    var state = {
        carrierId: 1
      },
      action = {
        payload: {}
      };

    expect(carrierReducer(state, action)).toEqual(state);
  });
});