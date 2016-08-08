angular.module('echo.index.carrier.loadManagement', [
  'echo.components.tabBar',
  'echo.components.searchBar',
  'echo.config.routes',
  'echo.api.loads',
  'echo.index.carrier.loadManagement.activeLoads',
  'echo.index.carrier.loadManagement.unbilledLoads',
  'echo.index.carrier.loadManagement.upcomingLoads',
  'echo.index.carrier.loadManagement.searchLoads'
])
  .component('loadManagement', {
    templateUrl: 'app/pages/index/carrier/components/load-management/load-management.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function ($stateParams, $state, routesConfig) {
      var that = this;

      that.activeLoadCount = 0;

      if($stateParams.searchText) {
        that.tabReplacementText = _.template('Search Results for ${searchText}')({searchText: $stateParams.searchText});
      }

      //that.showLoading = true;

      that.defaultRoute = routesConfig.INDEX.activeLoads.name;
      that.hideOnRoutes = [routesConfig.INDEX.searchLoads.name];

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

        that.routeToSearch = function(searchText){
          $state.go(routesConfig.INDEX.searchLoads.name, {searchText: searchText});
        };
      /*
           loadsApi.fetchLoadCount(that.carrierId).then(function (loadCounts) {
             
     
           }).finally(function () {
             that.showLoading = false;
           });
     
           */
    }
  });
