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
  controller: function($state, routesConfig, loadsApi, PagingModel, appConstants, loadTypesEnum) {

    this.getLoadsBySearchText = function() {
      this.paging.reset();
      this.getLoads();
    };

    this.getLoads = function() {
      var that = this;

      that.showLoading = true;
      loadsApi.fetchLoadsBySearchText(that.carrierId, that.searchText, that.paging).then(function(searchLoads) {
        that.paging.totalRecords = searchLoads.totalLoadCount;
        that.paging.recordCount = _.size(searchLoads.loads);
        that.loads = searchLoads.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    this.$onInit = function() {
      this.showLoading = false;
      this.routesConfig = routesConfig;
      this.loadCount = 0;
      this.previousRouteName = _.get($state.previous, 'data.name');
      this.previousRoute = _.get($state.previous, 'name');
      this.paging = new PagingModel(appConstants.LIMIT.loadsList);
      this.loadType = loadTypesEnum.UNBILLED;

      this.getLoadsBySearchText();
    };
  }
});