angular.module('echo.index.carrier.loadManagement', [
    'echo.components.tabBar',
    'echo.components.searchBar',
    'echo.config.routes',
    'echo.index.carrier.loadManagement.activeLoads',
    'echo.index.carrier.loadManagement.unbilledLoads',
    'echo.index.carrier.loadManagement.upcomingLoads',
    'echo.index.carrier.loadManagement.searchLoads',
    'echo.index.carrier.loadManagement.loadDetails',
    'echo.action',
    'echo.actions.creators.loadCounts'
  ])
  .component('loadManagement', {
    templateUrl: 'app/pages/index/carrier/components/load-management/load-management.template.html',
    controller: function($stateParams, $state, Rx, loadCountsActionCreator, routesConfig, store$) {
      var that = this;
      var sub = null;

      that.routeToSearch = function(searchText) {
        $state.go(routesConfig.INDEX.searchLoads.name, {
          searchText: searchText
        });
      };

      that.createTabItems = function(loadCounts) {
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
      };

      that.$onInit = function() {
        var state = store$.getState();

        that.repDetails = state.rep;
        that.carrierId = state.carrier.carrierId;
        that.activeLoadCount = 0;
        that.stateParams = $stateParams;
        that.showLoading = true;
        that.state = $state;
        that.routesConfig = routesConfig;
        that.isActiveLoads = $state.$current.data.isActiveLoads;

        sub = store$.subscribe(function(state) {
          if (!_.isEmpty(state.loadCounts)) {
            that.createTabItems(state.loadCounts);
            that.showLoading = false;
          }
        });

        if (!that.isActiveLoads) {
          var action = loadCountsActionCreator.fetchLoadCounts(that.carrierId);
          store$.dispatch(action);
        }
      };

      that.$onDestroy = function() {
        sub.dispose();
      };
    }
  });