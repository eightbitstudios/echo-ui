angular.module('echo.index.actionsCreators.rep', [
  'echo.actions',
  'echo.api.rep'
]).factory('repActionCreator', function(Rx, repActions, repApi) {
  return {
    fetchRep: function(carrierId) {
      var that = this;
      return {
        type: repActions.LOADING_REP,
        payload: Rx.Observable.fromPromise(repApi.fetchRepByCarrierId(carrierId))
          .flatMap(that.setRep)
      };
    },
    setRep: function(repData) {
      return {
        type: repActions.SET_REP,
        payload: repData
      };
    },
    clearRep: function() {
      return {
        type: repActions.CLEAR_REP
      };
    }
  };
});