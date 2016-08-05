angular.module('echo.index.carrier.loadManagement', [
  'echo.components.tabBar',
  'echo.components.searchBar',
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

      that.searchText = '';
      that.activeLoadCount = 0;

      //that.showLoading = true;

      that.defaultRoute = routesConfig.INDEX.activeLoads.name;

      that.tabItems = [{
        title: ' Active Loads',
        link: routesConfig.INDEX.activeLoads.name
      }, {
          title: '0 Unbilled Loads',
          link: routesConfig.INDEX.unbilledLoads.name
        }, {
          title: '0 Upcoming Loads',
          link: routesConfig.INDEX.upcomingLoads.name
        }];

        that.$onChanges = function() {
              that.tabItems[0].title = that.activeLoadCount + ' Active Loads';
        };

      /*
           loadsApi.fetchLoadCount(that.carrierId).then(function (loadCounts) {
             
     
           }).finally(function () {
             that.showLoading = false;
           });
     
           */
    }
  });
