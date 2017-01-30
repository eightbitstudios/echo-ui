angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.components.navbar',
]).component('carrier', {
  bindings: {
    carrierId: '<'
  },
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function($q, Rx, store$, carrierApi, repApi, carrierActions, repActions) {
    this.$onInit = function() {
      var that = this;
      that.showLoading = true;

      var carrierPromise = carrierApi.fetchCarrierById(that.carrierId);
      var repPromise = repApi.fetchRepByCarrierId(that.carrierId);

      store$.dispatch({
        type: carrierActions.LOADING_CARRIER,
        payload: Rx.Observable.fromPromise(carrierPromise)
          .map(function(carrierDetails) {
            return {
              type: carrierActions.SET_CARRIER,
              payload: carrierDetails
            };
          }).concatAll()
      });
      store$.dispatch({
        type: repActions.LOADING_REP,
        payload: Rx.Observable.fromPromise(repPromise)
          .map(function(rep) {
            return {
              type: repActions.SET_REP,
              payload: rep
            };
          }).concatAll()
      });

      $q.all([carrierPromise, repPromise]).then(function() {
        that.showLoading = false;
      });
    };

  }
});