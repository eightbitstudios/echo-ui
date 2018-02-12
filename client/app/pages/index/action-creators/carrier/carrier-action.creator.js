angular.module('echo.index.actionsCreators.carrier', [
  'echo.actions',
  'echo.api.carrier'
]).factory('carrierActionCreator', function(Rx, carrierActions, carrierApi) {
  return {
    fetchCarrier: function(carrierId) {
      var that = this;
      return {
        type: carrierActions.LOADING_CARRIER,
        payload: Rx.Observable.fromPromise(carrierApi.fetchCarrierById(carrierId))
          .flatMap(that.setCarrier)
      };
    },
    setCarrier: function(carrierDetails) {
      return {
        type: carrierActions.SET_CARRIER,
        payload: carrierDetails
      };
    },
    clearCarrier: function() {
      return {
        type: carrierActions.CLEAR_CARRIER
      };
    }
  };
});