angular.module('echo.index.carrier.dashboard', [
    'echo.components.loadTable',
    'echo.models.paging',
    'echo.config.routes',
    'echo.enums.loadTypes',
    'echo.config.appConstants',
    'echo.api.loads',
    'echo.components.loadMap',
    'echo.components.showMore'
  ])
  .component('dashboard', {
    templateUrl: 'app/pages/index/carrier/components/dashboard/dashboard.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function($q, appConstants, loadTypesEnum, routesConfig, PagingModel, loadsApi) {
      var that = this;
      that.showActionLoadsLoading = false;
      that.showMultiStopLoading = false;
      that.showMoreActionLoadsLoading = false;
      that.showMoreMultiStopLoading = false;
      that.pagingActionLoads = new PagingModel(appConstants.LIMIT.loadsNeedingAction);
      that.pagingMultistopLoads = new PagingModel(appConstants.LIMIT.multistopLoads);
      that.activeLoadsRoute = routesConfig.INDEX.activeLoads.name;
      that.loadType = loadTypesEnum.ACTIVE;

      that.showMoreActionLoadsHandler = function() {
        that.showMoreActionLoadsLoading = true;
        loadsApi.fetchDashboard(that.carrierId, false, false, that.pagingActionLoads, {})
          .then(function(dashboard) {
            var loadsNeedingAction = dashboard.singleStopLoads;
            that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
            that.activeLoads = _.concat(that.activeLoads, loadsNeedingAction.loads);
          }).finally(function() {
            that.showMoreActionLoadsLoading = false;
          });
      };

      that.fetchLoadsNeedingAction = function() {
        that.showActionLoadsLoading = true;
        that.pagingActionLoads.reset();
        loadsApi.fetchDashboard(that.carrierId, false, false, that.pagingActionLoads, {})
          .then(function(dashboard) {
            var loadsNeedingAction = dashboard.singleStopLoads;
            that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
            that.activeLoads = loadsNeedingAction.loads;
          }).finally(function() {
            that.showActionLoadsLoading = false;
          });
      };

      that.fetchMultistopLoads = function() {
        that.showMultiStopLoading = true;
        that.pagingMultistopLoads.reset();
        loadsApi.fetchDashboard(that.carrierId, false, false, {}, that.pagingMultistopLoads)
          .then(function(dashboard) {
            var multiStopLoads = dashboard.multiStopLoads;
            that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
            that.multiStopLoads = multiStopLoads.loads;
          }).finally(function() {
            that.showMultiStopLoading = false;
          });
      };

      that.showMoreMultiStopLoadsHandler = function() {
        that.showMoreMultiStopLoading = true;
        loadsApi.fetchDashboard(that.carrierId, false, false, {}, that.pagingMultistopLoads).then(function(dashboard) {
          var multiStopLoads = dashboard.multiStopLoads;
          that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
          that.multiStopLoads = _.concat(that.multiStopLoads, multiStopLoads.loads);
        }).finally(function() {
          that.showMoreMultiStopLoading = false;
        });
      };

      that.refreshPageData = function() {
        that.fetchLoadDashboard();
      };

      that.fetchLoadDashboard = function() {
        that.showMultiStopLoading = true;
        that.showActionLoadsLoading = true;
        that.showMap = false;
        loadsApi.fetchDashboard(that.carrierId, true, true, that.pagingActionLoads, that.pagingMultistopLoads).then(function(dashboard) {
          var multiStopLoads = dashboard.multiStopLoads;
          var loadsNeedingAction = dashboard.singleStopLoads;

          that.activeLoadsCount = dashboard.activeLoadsCount;
          that.mapPoints = dashboard.mapLoads;
          that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
          that.multiStopLoads = multiStopLoads.loads;
          that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
          that.activeLoads = loadsNeedingAction.loads;
        }).finally(function() {
          that.showMultiStopLoading = false;
          that.showActionLoadsLoading = false;
          that.showMap = true;
        });
      };

      that.$onInit = function() {
        that.fetchLoadDashboard();
      };
    }
  });