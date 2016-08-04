angular.module('echo.index.carrier.loadManagement.activeLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact'
]).component('activeLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function (loadsApi) {
    var that = this;
    that.showLoading = true;
    loadsApi.fetchAvailableLoads(that.carrierId).then(function(activeLoads){
      that.activeLoads = activeLoads;
    }).finally(function () {
      that.showLoading = false;
    });
  }
});
