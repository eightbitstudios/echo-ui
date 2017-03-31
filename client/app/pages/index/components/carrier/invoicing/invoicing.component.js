angular.module('echo.index.carrier.invoicing', [
    'echo.components.tabBar',
    'echo.components.searchBar',
    'echo.config.routes',
    'echo.index.carrier.invoicing.activeInvoices',
    'echo.index.carrier.invoicing.archivedInvoices',
    'echo.index.carrier.invoicing.searchInvoices',
    'echo.actions',
    'echo.api.invoices',
    'echo.index.actionsCreators.invoiceCounts'
  ])
  .component('invoicing', {
    templateUrl: 'invoicing.component.html',
    bindings: {},
    controller: function($stateParams, $state, store$, routesConfig, invoicesApi, invoiceCountsActionCreator) {
      var that = this;

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

      that.fetchInvoicesCount = function() {
        invoicesApi.fetchInvoiceCount(that.carrierId).then(function(invoiceCounts) {
          var action = invoiceCountsActionCreator.setInvoiceCounts(invoiceCounts);
          store$.dispatch(action);
          that.createTabItems(invoiceCounts);
          that.showLoading = false;
        });
      };

      that.createTabItems = function(invoiceCounts) {
        that.tabItems = [{
          title: invoiceCounts.activeInvoices + ' Active Invoices',
          link: routesConfig.INDEX.activeInvoices.name
        }, {
          title: that.formatInvoiceCount(invoiceCounts.archivedInvoices) + ' Archived Invoices',
          link: routesConfig.INDEX.archivedInvoices.name
        }];
      };

      that.formatInvoiceCount = function(invoiceCount) {
        return invoiceCount > 1000 ? '1000+' : invoiceCount;
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
        that.fetchInvoicesCount();
      };
    }
  });