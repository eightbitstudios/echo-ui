describe('Reducer: invoiceCount', function() {
  'use strict';

  var invoiceCountReducer, invoiceCountsActions;

  beforeEach(function() {
    module('echo.reducers.invoiceCount');
    inject(function(_invoiceCountReducer_, _invoiceCountsActions_) {
      invoiceCountReducer = _invoiceCountReducer_;
      invoiceCountsActions = _invoiceCountsActions_;
    });
  });

  it('should return payload when setting a invoice count', function() {
    var state = {},
      action = {
        type: invoiceCountsActions.INVOICE_COUNTS_LOADED,
        payload: {
          count: 1
        }
      };

    expect(invoiceCountReducer(state, action)).toEqual(action.payload);
  });

  it('should clear state when removing invoice count', function() {
    var state = {
        count: 1
      },
      action = {
        type: invoiceCountsActions.CLEAR_INVOICE_COUNTS,
        payload: {}
      };

    expect(invoiceCountReducer(state, action)).toEqual({});
  });

  it('should return the current state if no action is provided', function() {
    var state = {
        count: 1
      },
      action = {
        payload: {}
      };

    expect(invoiceCountReducer(state, action)).toEqual(state);
  });
});