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
    controller: function (routesConfig) {
      var that = this;

      //that.showLoading = true;

      that.defaultRoute = routesConfig.INDEX.activeLoads.name;
      that.tabItems = [{
        title: 'Active Loads',
        link: routesConfig.INDEX.activeLoads.name
      }, {
          title: 'Unbilled Loads',
          link: routesConfig.INDEX.unbilledLoads.name
        }, {
          title: 'Upcoming Loads',
          link: routesConfig.INDEX.upcomingLoads.name
        }];

      /*
           loadsApi.fetchLoadCount(that.carrierId).then(function (loadCounts) {
             
     
           }).finally(function () {
             that.showLoading = false;
           });
     
           */
    }
  });
