angular.module('echo.index.carrier.dashboard', [
  'echo.components.loadTable',
  'echo.models.paging',
  'echo.config.routes',
  'echo.enums.loadTypes',
  'echo.api.loads',
  'echo.components.mapPlaceholder',
  'echo.components.showMore'
])
  .component('dashboard', {
    templateUrl: 'app/pages/index/carrier/components/dashboard/dashboard.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function ($q, loadTypesEnum, routesConfig, PagingModel, loadsApi) {
      var that = this;

      that.showActionLoadsLoading = false;
      that.showMultiStopLoading = false;
      that.showMoreActionLoadsLoading = false;
      that.showMoreMultiStopLoading = false;
      that.pagingActionLoads = new PagingModel(5);
      that.pagingMultistopLoads = new PagingModel(5);
      that.activeLoadsRoute = routesConfig.INDEX.activeLoads.name;
      that.loadType = loadTypesEnum.ACTIVE;

      that.showMoreActionLoadsHandler = function () {
        that.showMoreActionLoadsLoading = true;
        loadsApi.fetchLoadsNeedingAction(that.carrierId, that.pagingActionLoads).then(function (loadsNeedingAction) {
          that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
          that.activeLoads = _.concat(that.activeLoads, loadsNeedingAction.loads);
        }).finally(function () {
          that.showMoreActionLoadsLoading = false;
        });
      };

      that.showMoreMultiStopLoadsHandler = function () {
        that.showMoreMultiStopLoading = true;
        loadsApi.fetchMultiStopLoads(that.carrierId, that.pagingMultistopLoads).then(function (multiStopLoads) {
          that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
          that.multiStopLoads = _.concat(that.multiStopLoads, multiStopLoads.loads);
        }).finally(function () {
          that.showMoreMultiStopLoading = false;
        });
      };

      that.fetchLoadsNeedingAction = function () {
        that.showActionLoadsLoading = true;
        that.pagingActionLoads.reset();
        return loadsApi.fetchLoadsNeedingAction(that.carrierId, that.pagingActionLoads)
          .then(function (loadsNeedingAction) {
            that.pagingActionLoads.setRecords(loadsNeedingAction.totalLoadCount, _.size(loadsNeedingAction.loads));
            that.activeLoads = loadsNeedingAction.loads;
          }).finally(function () {
            that.showActionLoadsLoading = false;
          });
      };

      that.fetchMultiStopLoads = function () {
        that.showMultiStopLoading = true;
        that.pagingMultistopLoads.reset();
        return loadsApi.fetchMultiStopLoads(that.carrierId, that.pagingMultistopLoads)
          .then(function (multiStopLoads) {
            that.pagingMultistopLoads.setRecords(multiStopLoads.totalLoadCount, _.size(multiStopLoads.loads));
            that.multiStopLoads = multiStopLoads.loads;
          }).finally(function () {
            that.showMultiStopLoading = false;
          });
      };

      that.$onInit = function () {
        $q.all([that.fetchLoadsNeedingAction(),
          that.fetchMultiStopLoads(),
          loadsApi.fetchLoadCount(that.carrierId)])
          .then(_.spread(function (loadsNeedingAction, multiStopLoads, loadCounts) {
            that.activeLoadCount = loadCounts.active;
          }));
      };
    }
  });