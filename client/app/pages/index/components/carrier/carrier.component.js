angular.module('echo.index.carrier', [
  'echo.index.carrier.myCompany',
  'echo.index.carrier.dashboard',
  'echo.index.carrier.carrierAdminNav',
  'echo.index.carrier.loadManagement',
  'echo.index.carrier.invoicing',
  'echo.components.navbar',
  'echo.index.actionsCreators.rep',
  'echo.index.actionsCreators.carrier',
  'echo.index.actionsCreators.loadCounts',
  'echo.index.actionsCreators.invoiceCounts'
]).component('carrier', {
  templateUrl: 'carrier.component.html',
  controller: function($stateParams, $q, store$, carrierActionCreator, repActionCreator, loadCountsActionCreator, invoiceCountsActionCreator) {

    var that = this;

    that.$onInit = function() {

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

    that.$onDestroy = function() {
      var loadCountsAction = loadCountsActionCreator.clearLoadCounts();
      var invoiceCountsAction = invoiceCountsActionCreator.clearInvoiceCounts();
      var carrierAction = carrierActionCreator.clearCarrier();
      var repAction = repActionCreator.clearRep();

      store$.dispatch(loadCountsAction);
      store$.dispatch(invoiceCountsAction);
      store$.dispatch(carrierAction);
      store$.dispatch(repAction);
    };
  }
});