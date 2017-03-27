angular.module('echo.index.carrier.loadManagement', [
    'echo.components.tabBar',
    'echo.components.searchBar',
    'echo.config.routes',
    'echo.index.carrier.loadManagement.activeLoads',
    'echo.index.carrier.loadManagement.unbilledLoads',
    'echo.index.carrier.loadManagement.upcomingLoads',
    'echo.index.carrier.loadManagement.searchLoads',
    'echo.index.carrier.loadManagement.loadDetails',
    'echo.actions',
    'echo.index.actionsCreators.loadCounts'
  ])
  .component('loadManagement', {
    templateUrl: 'load-management.component.html',
    controller: function($stateParams, $state, loadCountsActionCreator, routesConfig, store$) {
      var that = this;

      that.routeToSearch = function(searchText) {

        if ($state.$current.name !== routesConfig.INDEX.searchLoads.name) {
          that.previousRoute = $state.$current.name;
        }

        if($stateParams.previous !== routesConfig.INDEX.searchLoads.name){
          that.previousRoute = $stateParams.previous || $state.$current.name;
        }

        $state.go(routesConfig.INDEX.searchLoads.name, {
          searchText: searchText,
          previous: that.previousRoute
        }, {
          reload: routesConfig.INDEX.searchLoads.name
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
        that.previousRoute = $state.$current.name;

        store$.subscribe(function(state) {
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
    }
  });