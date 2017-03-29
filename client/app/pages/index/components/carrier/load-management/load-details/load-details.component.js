angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.config.routes',
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.components.equipment',
  'echo.components.loadMap',
  'echo.index.carrier.loadManagement.loadDetails.loadDetail',
  'echo.index.carrier.loadManagement.loadDetails.documents',
  'echo.index.carrier.loadManagement.loadDetails.activityLog',
  'echo.api.loads',
  'echo.index.carrier.previousState',
  'echo.components.invoiceAccordion',
  'echo.api.invoices'
]).component('loadDetails', {
  templateUrl: 'load-details.component.html',
  controller: function($q, $stateParams, store$, loadsApi, invoicesApi) {
    var that = this;

    that.getMapPoint = function() {

      that.showMap = false;
      that.mapPoints = [];
      loadsApi.fetchMapPointByLoadGuid(_.get(that.loadDetails, 'loadGuid'))
        .then(function(mapPointData) {
          if (mapPointData) {
            that.mapPoints.push(mapPointData);
          }
          that.showMap = true;
        });
    };

    that.fetchLoadDetails = function() {

      that.showLoading = true;
      that.showMap = false;

      $q.all([loadsApi.fetchLoadDetails(that.loadId), invoicesApi.fetchInvoiceDetailsByLoadId(that.loadId)])
        .then(_.spread(function(loadDetails, invoiceDetails) {
          that.loadDetails = loadDetails;
          that.pickupNumbers = _.map(that.loadDetails.pickUp, 'pickupNumber');
          that.deliveryNumbers = _.map(that.loadDetails.delivery, 'pickupNumber');
          that.showLoading = false;
          that.invoiceDetails = invoiceDetails;
          that.getMapPoint();
        }));
    };

    that.$onInit = function() {

      var state = store$.getState();

      that.repDetails = state.rep;
      that.carrierId = state.carrier.carrierId;
      that.loadId = $stateParams.loadId;

      that.fetchLoadDetails();
    };
  }
});