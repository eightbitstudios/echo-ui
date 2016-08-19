angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.api.loads',
  'echo.index.carrier.loadManagement.loadDetails.loadDetail'
])
  .component('loadDetails', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/load-details.template.html',
    bindings: {
      repDetails: '<',
      loadId: '<'
    },
    controller: function (loadsApi) {
      var that = this;

      that.showLoading = false;

      that.$onInit = function () {
        that.showLoading = true;
        loadsApi.fetchLoadDetails(that.loadId).then(function (loadDetails) {
          that.loadDetails = loadDetails;
        }).finally(function () {
          that.showLoading = false;
        });
      };
    }
  });
