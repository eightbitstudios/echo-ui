angular.module('echo.index.carrier.loadManagement.upcomingLoads', [
  'echo.components.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.enums.loadTypes'
]).component('upcomingLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum) {

    this.getUpcomingLoads = function() {
      var that = this;

      that.showLoading = true;
      loadsApi.fetchUpcomingLoads(that.carrierId, that.paging, that.isDriverNeeded).then(function(upcomingLoadData) {
        that.paging.totalRecords = upcomingLoadData.totalLoadCount;
        that.paging.recordCount = _.size(upcomingLoadData.loads);
        that.upcomingLoads = upcomingLoadData.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    this.driverNeededHandler = function(value) {
      if (!value) {
        this.filterText = this.defaultFilterText;
      } else {
        this.filterText = 'By Driver Needed';
      }
      this.isDriverNeeded = value;
      this.paging.reset();
      this.getUpcomingLoads();
    };

    this.$onInit = function() {
      this.showLoading = false;
      this.paging = new PagingModel(appConstants.LIMIT.loadsList);
      this.loadType = loadTypesEnum.UPCOMING;
      this.defaultFilterText = 'By First Pickup Stop';
      this.filterText = this.defaultFilterText;
      this.getUpcomingLoads();
    };
  }
});