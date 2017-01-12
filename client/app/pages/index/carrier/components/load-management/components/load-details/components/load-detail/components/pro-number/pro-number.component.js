angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber', [
  'echo.components.editNumber',
  'echo.api.loads'
])
  .component('proNumber', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/components/pro-number/pro-number.template.html',
    bindings: {
      proNumber: '=',
      bolNumber: '<',
      loadGuid: '<'
    },
    controller: function (loadsApi) {
      this.updateProNumber = function (newProNumber) {
        var that = this;
        
        return loadsApi.updateProNumber(that.loadGuid, { proNumber: newProNumber }).then(function (data) {
          that.proNumber = _.get(data, 'proNumber');
          return false;
        }).catch(function (error) {
          that.errorMessages = error.data.status.message;
          that.errorCode = error.data.status.code;
          return true;
        });
      };
    }
  });
