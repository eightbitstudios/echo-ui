angular.module('echo.index.carrier.loadManagement', [
  'echo.components.tabBar',
  'echo.config.routes',
  'echo.index.carrier.loadManagement.activeLoads',
  'echo.index.carrier.loadManagement.unbilledLoads',
  'echo.index.carrier.loadManagement.upcomingLoads'
])
  .component('loadManagement', {
    templateUrl: 'app/pages/index/carrier/components/load-management/load-management.template.html',
    bindings: {},
    controller: function (routesConfig) {
      var that = this;

      that.tabItems = [{
        title: '12 Active Loads',
        link: routesConfig.INDEX.activeLoads.name
      }, {
          title: '13 Unbilled Loads',
          link: routesConfig.INDEX.unbilledLoads.name
        }, {
          title: '5 Upcoming Loads',
          link: routesConfig.INDEX.upcomingLoads.name
        }];

      that.defaultRoute = routesConfig.INDEX.activeLoads.name;
    }
  });
