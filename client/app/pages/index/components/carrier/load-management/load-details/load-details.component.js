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
    'echo.components.invoiceAccordion'
  ])
  .component('loadDetails', {
    templateUrl: 'load-details.component.html',
    controller: function($state, $q, $stateParams, store$, loadsApi) {
      var that = this;

      that.getMapPoint = function() {

        that.showMap = false;
        that.mapPoints = [];
        loadsApi.fetchMapPointByLoadGuid(_.get(that.loadDetails, 'loadGuid')).then(function(mapPointData) {
          if (mapPointData) {
            that.mapPoints.push(mapPointData);
          }
          that.showMap = true;
        });
      };

      that.fetchLoadDetails = function() {

        that.showLoading = true;
        that.showMap = false;

        loadsApi.fetchLoadDetails(that.loadId)
          .then(function(loadDetails) {
            that.loadDetails = loadDetails;
            that.pickupNumbers = _.map(that.loadDetails.pickUp, 'pickupNumber');
            that.deliveryNumbers = _.map(that.loadDetails.delivery, 'pickupNumber');
            that.showLoading = false;
            that.getMapPoint();
          });
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