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
        return loadsApi.updateProNumber(that.loadGuid, { proNumber: newProNumber }).then(function (data) {
          that.proNumber = _.get(data, 'proNumber');
        });
      };
    }
  });
