angular.module('echo.index.carrier.loadManagement.searchLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact'
]).component('searchLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/search-loads/search-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<',
    searchText: '<'
  },
  controller: function (routesConfig, loadsApi) {
    var that = this;
    that.showLoading = false;

    that.routesConfig = routesConfig;

    that.getLoadsBySearchText = function () {
      that.showLoading = true;
      loadsApi.fetchLoadsBySearchText(that.carrierId, that.searchText).then(function (searchLoads) {
        that.loads = searchLoads.loads;
      }).finally(function () {
        that.showLoading = false;
      });
  };

    that.$onInit = that.getLoadsBySearchText;
  }
});
