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

      this.showMoreActionLoadsHandler = function() {
        var that = this;

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

      this.fetchLoadsNeedingAction = function() {
        var that = this;

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

      this.fetchMultistopLoads = function() {
        var that = this;

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

      this.showMoreMultiStopLoadsHandler = function() {
        var that = this;

        that.showMoreMultiStopLoading = true;
        loadsApi.fetchDashboard(that.carrierId, false, false, {}, that.pagingMultistopLoads).then(function(dashboard) {
          var multiStopLoads = dashboard.multiStopLoads;
          that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
          that.multiStopLoads = _.concat(that.multiStopLoads, multiStopLoads.loads);
        }).finally(function() {
          that.showMoreMultiStopLoading = false;
        });
      };

      this.refreshPageData = function() {
        this.fetchLoadDashboard();
      };

      this.fetchLoadDashboard = function() {
        var that = this;

        that.showMultiStopLoading = true;
        that.showActionLoadsLoading = true;
        that.showMap = false;
        loadsApi.fetchDashboard(that.carrierId, true, true, that.pagingActionLoads, that.pagingMultistopLoads).then(function(dashboard) {
          var multiStopLoads = dashboard.multiStopLoads;
          var loadsNeedingAction = dashboard.singleStopLoads;

          that.activeLoadsCount = dashboard.activeLoadsCount;
          that.mapPoints = dashboard.mapLoads;

          if (_.get(multiStopLoads, 'totalLoadCount')) {
            that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
          }

          if (_.get(loadsNeedingAction, 'totalLoadCount')) {
            that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
          }

          that.multiStopLoads = _.get(multiStopLoads, 'loads') || [];
          that.activeLoads = _.get(loadsNeedingAction, 'loads') || [];
        }).finally(function() {
          that.showMultiStopLoading = false;
          that.showActionLoadsLoading = false;
          that.showMap = true;
        });
      };

      this.$onInit = function() {
        this.showActionLoadsLoading = false;
        this.showMultiStopLoading = false;
        this.showMoreActionLoadsLoading = false;
        this.showMoreMultiStopLoading = false;
        this.pagingActionLoads = new PagingModel(appConstants.LIMIT.loadsNeedingAction);
        this.pagingMultistopLoads = new PagingModel(appConstants.LIMIT.multistopLoads);
        this.activeLoadsRoute = routesConfig.INDEX.activeLoads.name;
        this.loadType = loadTypesEnum.ACTIVE;

        this.fetchLoadDashboard();
      };
    }
  });