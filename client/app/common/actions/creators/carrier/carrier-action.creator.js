angular.module('echo.actions.creators.carrier', [
  'echo.action',
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
    }
  };
});