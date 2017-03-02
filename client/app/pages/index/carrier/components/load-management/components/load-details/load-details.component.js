angular.module('echo.index.carrier.loadManagement.loadDetails', [
    'echo.components.echoRepContact',
    'echo.components.stopAccordion',
    'echo.components.equipment',
    'echo.components.loadMap',
    'echo.index.carrier.loadManagement.loadDetails.loadDetail',
    'echo.index.carrier.loadManagement.loadDetails.documents',
    'echo.index.carrier.loadManagement.loadDetails.activityLog',
    'echo.api.loads',
    'echo.api.document'
  ])
  .component('loadDetails', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/load-details.template.html',
    controller: function($state, $q, $stateParams, store$, loadsApi, documentApi) {
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
            that.totalStops = _.size(that.loadDetails.pickUp) + _.size(that.loadDetails.delivery);
            return $q.all([loadsApi.fetchActivityLogByLoadId(that.loadDetails.loadNumber),
              documentApi.fetchDocuments(that.carrierId, that.loadDetails.loadGuid)
            ]);
          }).then(_.spread(function(activityLog, documents) {
            that.activityLog = activityLog;
            that.documents = documents;
            that.showLoading = false;
            that.getMapPoint();
          }));
      };

      that.$onInit = function() {

        var state = store$.getState();

        that.repDetails = state.rep;
        that.carrierId = state.carrier.carrierId;
        that.loadId = $stateParams.loadId;

        that.fetchLoadDetails();

        if ($state.previous.data) {
          that.previousRouteName = $state.previous.data.name;
          that.previousRoute = $state.previous.name;
        }
      };
    }
  });