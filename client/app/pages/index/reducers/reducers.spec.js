describe('Reducer: combineReducers', function() {
  'use strict';

  var combineReducers;

  beforeEach(function() {
    module('echo.reducers');
    inject(function(_combineReducers_) {
      combineReducers = _combineReducers_;
    });
  });

  it('should call all reducers', function() {
    var action = 'CALL_REDUCERS',
      state = {
        reducer1: {
          id: 1
        },
        reducer2: {
          id: 2
        },
        reducer3: {
          id: 3
        }
      };


    var reducer1Reducer = jasmine.createSpy('reducer1').and.returnValue(state.reducer1),
      reducer2Reducer = jasmine.createSpy('reducer2').and.returnValue(state.reducer2),
      reducer3Reducer = jasmine.createSpy('reducer3').and.returnValue(state.reducer3);

    var combineReducerFunc = combineReducers({
      reducer1: reducer1Reducer,
      reducer2: reducer2Reducer,
      reducer3: reducer3Reducer
    });

    combineReducerFunc(state, action);

    expect(reducer1Reducer).toHaveBeenCalledWith(state.reducer1, action);
    expect(reducer2Reducer).toHaveBeenCalledWith(state.reducer2, action);
    expect(reducer3Reducer).toHaveBeenCalledWith(state.reducer3, action);
  });

  it('should update state', function() {
    var action = 'CALL_REDUCERS',
      state = {
        reducer1: {},
        reducer2: {
          id: 2
        },
        reducer3: {
          id: 3
        }
      };

    var reducer1Reducer = jasmine.createSpy('reducer1').and.returnValue({}),
      reducer2Reducer = jasmine.createSpy('reducer2').and.returnValue({
        name: 'reducer2'
      }),
      reducer3Reducer = jasmine.createSpy('reducer3').and.returnValue(state.reducer3);

    var combineReducerFunc = combineReducers({
      reducer1: reducer1Reducer,
      reducer2: reducer2Reducer,
      reducer3: reducer3Reducer
    });

    combineReducerFunc(state, action);
    expect(state.reducer1).toEqual({});
    expect(state.reducer2).toEqual({name: 'reducer2'});
    expect(state.reducer3).toEqual({id: 3});
  });
});