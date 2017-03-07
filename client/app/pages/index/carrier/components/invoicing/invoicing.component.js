angular.module('echo.index.carrier.invoicing', [
    'echo.components.tabBar',
    'echo.components.searchBar',
    'echo.config.routes',
    'echo.index.carrier.invoicing.activeInvoices',
    'echo.index.carrier.invoicing.searchInvoices',
    'echo.action'
  ])
  .component('invoicing', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/invoicing.component.html',
    bindings: {},
    controller: function($stateParams, $state, store$, routesConfig) {
      var that = this;
      var sub = null;

      that.routeToSearch = function(searchText) {

        if ($state.$current.name !== routesConfig.INDEX.searchInvoices.name) {
          that.previousRoute = $state.$current.name;
        }

        if ($stateParams.previous !== routesConfig.INDEX.searchInvoices.name) {
          that.previousRoute = $stateParams.previous || $state.$current.name;
        }

        $state.go(routesConfig.INDEX.searchInvoices.name, {
          searchText: searchText,
          previous: that.previousRoute
        }, {
          reload: routesConfig.INDEX.searchInvoices.name
        });
      };

      that.createTabItems = function(invoiceCounts) {
        that.tabItems = [{
          title: invoiceCounts.activeInvoices + ' Active Invoices',
          link: routesConfig.INDEX.activeInvoices.name
        }];
      };

      that.$onInit = function() {
        var state = store$.getState();

        that.repDetails = state.rep;
        that.carrierId = state.carrier.carrierId;
        that.stateParams = $stateParams;
        that.showLoading = true;
        that.state = $state;
        that.routesConfig = routesConfig;
        that.previousRoute = $state.$current.name;

        sub = store$.subscribe(function(state) {
          if (!_.isEmpty(state.invoiceCounts)) {
            that.createTabItems(state.invoiceCounts);
            that.showLoading = false;
          }
        });
      };

      that.$onDestroy = function() {
        sub.dispose();
      };
    }
  });