angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.components.equipment',
  'echo.index.carrier.loadManagement.loadDetails.loadDetail',
  'echo.index.carrier.loadManagement.loadDetails.documents',
  'echo.index.carrier.loadManagement.loadDetails.activityLog'
])
  .component('loadDetails', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/load-details.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<',
      loadDetails: '<',
      activityLog: '<'
    },
    controller: function ($state) {
      var that = this;
      
      that.$onInit = function () {
        if ($state.previous.data) {
          that.previousRouteName = $state.previous.data.name;
          that.previousRoute = $state.previous.name;
        }
      };
    }
  });