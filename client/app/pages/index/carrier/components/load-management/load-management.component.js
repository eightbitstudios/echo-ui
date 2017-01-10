angular.module('echo.index.carrier.loadManagement', [
    'echo.components.tabBar',
    'echo.components.searchBar',
    'echo.config.routes',
    'echo.api.loads',
    'echo.index.carrier.loadManagement.activeLoads',
    'echo.index.carrier.loadManagement.unbilledLoads',
    'echo.index.carrier.loadManagement.upcomingLoads',
    'echo.index.carrier.loadManagement.searchLoads',
    'echo.index.carrier.loadManagement.loadDetails',
    'echo.services.loadCount'
  ])
  .component('loadManagement', {
    templateUrl: 'app/pages/index/carrier/components/load-management/load-management.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function($stateParams, $state, routesConfig, loadCountService) {
      this.$onInit = function() {
        var that = this;
        that.activeLoadCount = 0;

        that.stateParams = $stateParams;
        that.showLoading = true;
        that.state = $state;
        that.routesConfig = routesConfig;
        that.isActiveLoads = ($state.$current.name === routesConfig.INDEX.activeLoads.name);
        that.isLoadDetails = ($state.$current.name === routesConfig.INDEX.loadDetails.name);

        loadCountService.fetchLoadCount(that.carrierId, that.isActiveLoads).then(function(loadCounts) {
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
          that.routeToSearch = function(searchText) {
            $state.go(routesConfig.INDEX.searchLoads.name, {
              searchText: searchText
            });
          };
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });