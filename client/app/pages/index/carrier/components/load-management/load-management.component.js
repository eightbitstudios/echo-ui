angular.module('echo.index.carrier.loadManagement', [
  'echo.components.tabBar',
  'echo.config.routes',
  'echo.api.loads',
  'echo.index.carrier.loadManagement.activeLoads',
  'echo.index.carrier.loadManagement.unbilledLoads',
  'echo.index.carrier.loadManagement.upcomingLoads'
])
  .component('loadManagement', {
    templateUrl: 'app/pages/index/carrier/components/load-management/load-management.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, routesConfig) {
      var that = this;

      that.showLoading = true;

      that.defaultRoute = routesConfig.INDEX.activeLoads.name;

      loadsApi.fetchLoadCount(that.carrierId).then(function (loadCounts) {
        that.tabItems = [{
          title: loadCounts.active + ' Active Loads',
          link: routesConfig.INDEX.activeLoads.name
        }, {
            title: loadCounts.unbilled + ' Unbilled Loads',
            link: routesConfig.INDEX.unbilledLoads.name
          }, {
            title: loadCounts.upcoming + ' Upcoming Loads',
            link: routesConfig.INDEX.upcomingLoads.name
          }];

      }).finally(function () {
        that.showLoading = false;
      });
    }
  });
