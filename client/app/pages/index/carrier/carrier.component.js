angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.index.carrier.invoicing',
  'echo.components.navbar',
  'echo.actions.creators.rep',
  'echo.actions.creators.carrier'
]).component('carrier', {
  templateUrl: 'app/pages/index/carrier/carrier.template.html',
  controller: function($stateParams, $q, store$, carrierActionCreator, repActionCreator) {

    var that = this;

    this.$onInit = function() {

      that.showLoading = true;
      that.carrierId = $stateParams.carrierId;

      var carrierAction = carrierActionCreator.fetchCarrier(that.carrierId);
      var repAction = repActionCreator.fetchRep(that.carrierId);

      store$.dispatch(carrierAction);
      store$.dispatch(repAction);

      $q.all([carrierAction.payload.source.toPromise(), repAction.payload.source.toPromise()]).then(function() {
        that.carrierDetails = store$.getState().carrier;
        that.showLoading = false;
      });
    };

  }
});
