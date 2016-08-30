angular.module('echo.index.carrier.loadManagement.searchLoads', [
  'echo.components.loadTable',
  'echo.api.loads',
  'echo.components.echoRepContact',
  'echo.models.paging',
  'echo.components.pagination',
  'echo.enums.loadTypes',
  'echo.config.appConstants'
]).component('searchLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/search-loads/search-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<',
    searchText: '<'
  },
  controller: function ($state, routesConfig, loadsApi, PagingModel, appConstants, loadTypesEnum) {
    var that = this;
    that.showLoading = false;

    that.routesConfig = routesConfig;
    that.loadCount = 0;

    that.previousRouteName = $state.previous.data.name;
    that.previousRoute = $state.previous.name;
    that.paging = new PagingModel(appConstants.LIMIT.loadsList);
    that.loadType = loadTypesEnum.UNBILLED;

    that.getLoadsBySearchText = function () {
      that.paging.reset();
      that.getLoads();
    };

    that.getLoads = function () {
      that.showLoading = true;
      that.loads = [];
      loadsApi.fetchLoadsBySearchText(that.carrierId, that.searchText, that.paging).then(function (searchLoads) {
        that.paging.totalRecords = searchLoads.totalLoadCount;
        that.paging.recordCount = _.size(searchLoads.loads);
        that.loads = searchLoads.loads;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = that.getLoadsBySearchText;
  }
});
