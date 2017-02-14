angular.module('echo.actions.creators.loadCounts', [
  'echo.action',
  'echo.api.loads'
]).factory('loadCountsActionCreator', function(Rx, loadCountsActions, loadsApi) {
  return {
    fetchLoadCounts: function(carrierId) {
      var that = this;
      return {
        type: loadCountsActions.FETCH_LOAD_COUNTS,
        payload: Rx.Observable.fromPromise(loadsApi.fetchLoadCount(carrierId))
          .flatMap(that.setLoadCounts)
      };
    },
    setLoadCounts: function(loadCounts) {
      return {
        type: loadCountsActions.LOAD_COUNTS_LOADED,
        payload: loadCounts
      };
    },
    clearLoadCounts: function() {
      return {
        type: loadCountsActions.CLEAR_LOAD_COUNTS
      };
    }
  };
});