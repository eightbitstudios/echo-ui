angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.components.equipment',
  'echo.components.mapPlaceholder',
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
    controller: function ($state, $q, loadsApi) {
      var that = this;

      that.$onInit = function () {
        that.showLoading = true;
        $q.all([loadsApi.fetchLoadDetails(that.loadId), loadsApi.fetchActivityLogByLoadId(that.loadId)])
          .then(_.spread(function (loadDetails, activityLog) {
            that.loadDetails = loadDetails;
            that.activityLog = activityLog;
            that.pickupNumbers = _.map(that.loadDetails.pickUp, 'pickupNumber');
            that.deliveryNumbers = _.map(that.loadDetails.delivery, 'pickupNumber');
            that.showLoading = false;
          }));

        if ($state.previous.data) {
          that.previousRouteName = $state.previous.data.name;
          that.previousRoute = $state.previous.name;
        }
      };
    }
  });
