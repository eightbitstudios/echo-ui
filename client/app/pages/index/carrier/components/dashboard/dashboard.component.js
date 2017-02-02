angular.module('echo.index.carrier.dashboard', [
    'echo.components.loadTable',
    'echo.models.paging',
    'echo.config.routes',
    'echo.enums.loadTypes',
    'echo.config.appConstants',
    'echo.components.loadMap',
    'echo.components.originDestinationMap',
    'echo.components.showMore',
    'echo.api.requestBuilder.dashboard'
  ])
  .component('dashboard', {
    templateUrl: 'app/pages/index/carrier/components/dashboard/dashboard.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function($q, appConstants, loadTypesEnum, routesConfig, PagingModel, DashboardRequestBuilder) {

      this.showMoreActionLoadsHandler = function() {
        var that = this;

        that.showMoreActionLoadsLoading = true;

        var dashboardRequestBuilder = new DashboardRequestBuilder(that.carrierId);

        dashboardRequestBuilder.fetchSingleStopLoads(that.pagingActionLoads).execute()
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

        var dashboardRequestBuilder = new DashboardRequestBuilder(that.carrierId);

        dashboardRequestBuilder.fetchSingleStopLoads(that.pagingActionLoads).execute()
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

        var dashboardRequestBuilder = new DashboardRequestBuilder(that.carrierId);

        dashboardRequestBuilder.fetchMultiStopLoads(that.pagingMultistopLoads).execute()
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

        var dashboardRequestBuilder = new DashboardRequestBuilder(that.carrierId);

        dashboardRequestBuilder.fetchMultiStopLoads(that.pagingMultistopLoads).execute().then(function(dashboard) {
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
        that.showLoading = true;

        var dashboardRequestBuilder = new DashboardRequestBuilder(that.carrierId);

        dashboardRequestBuilder.fetchDashboardPage(that.pagingActionLoads, that.pagingMultistopLoads)
          .execute().then(function(dashboard) {
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
            that.showLoading = false;
            that.showMap = true;
          });
      };

      this.toggleExpandedMap = function () {
        this.showExpandedMap = true;
        this.showLoadDetailsMap = false;
      };

      this.shrinkMap = function () {
        this.showExpandedMap = false;
        this.showLoadDetailsMap = false;
      };

      this.viewMapHandler = function(mapPoint) {
        this.loadDetailsMapPoint = mapPoint;
        this.showExpandedMap = false;
        this.showLoadDetailsMap = true;
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
        this.showExpandedMap = false;
        this.showLoadDetailsMap = false;
        this.showMap = false;

        this.fetchLoadDashboard();
      };
    }
  });
