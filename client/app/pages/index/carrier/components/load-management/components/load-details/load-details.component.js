angular.module('echo.index.carrier.loadManagement.loadDetails', [
    'echo.components.echoRepContact',
    'echo.components.stopAccordion',
    'echo.components.equipment',
    'echo.components.loadMap',
    'echo.index.carrier.loadManagement.loadDetails.loadDetail',
    'echo.index.carrier.loadManagement.loadDetails.documents',
    'echo.index.carrier.loadManagement.loadDetails.activityLog',
    'echo.api.loads'
  ])
  .component('loadDetails', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/load-details.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      loadId: '<'
    },
    controller: function($state, $q, loadsApi) {

      this.getMapPoint = function() {
        var that = this;

        that.showMap = false;
        that.mapPoints = [];
        loadsApi.fetchMapPointByLoadGuid(_.get(that.loadDetails, 'loadGuid')).then(function(mapPointData) {
          if (mapPointData) {
            that.mapPoints.push(mapPointData);
          }
          that.showMap = true;
        });
      };

      this.$onInit = function() {
        var that = this;
        
        that.showLoading = true;
        loadsApi.fetchLoadDetails(that.loadId)
          .then(function(loadDetails) {
            that.loadDetails = loadDetails;
            that.pickupNumbers = _.map(that.loadDetails.pickUp, 'pickupNumber');
            that.deliveryNumbers = _.map(that.loadDetails.delivery, 'pickupNumber');
            that.totalStops = _.size(that.loadDetails.pickUp) + _.size(that.loadDetails.delivery);
            return loadsApi.fetchActivityLogByLoadId(that.loadDetails.loadNumber);
          }).then(function(activityLog) {
            that.activityLog = activityLog;
          }).finally(function() {
            that.showLoading = false;
            that.getMapPoint();
          });

        if ($state.previous.data) {
          that.previousRouteName = $state.previous.data.name;
          that.previousRoute = $state.previous.name;
        }
      };
    }
  });