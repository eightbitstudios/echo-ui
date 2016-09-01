angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber', [
  'echo.components.editNumber',
  'echo.api.loads'
])
  .component('proNumber', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/components/pro-number/pro-number.template.html',
    bindings: {
      proNumber: '<',
      bolNumber: '<',
      loadGuid: '<'
    },
    controller: function (loadsApi) {
      var that = this;

      that.updateProNumber = function (newProNumber) {
        return loadsApi.updateLoad(that.loadGuid, { proNumber: newProNumber }).then(function (loadDetails) {
          that.proNumber = loadDetails.proNumber;
        });
      };
    }
  });
