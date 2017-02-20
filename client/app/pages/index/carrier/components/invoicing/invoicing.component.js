angular.module('echo.index.carrier.invoicing', [
  'echo.components.tabBar',
  'echo.config.routes',
  'echo.index.carrier.invoicing.activeInvoices',
  'echo.action',
  'echo.actions.creators.invoiceCounts'
])
  .component('invoicing', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/invoicing.template.html',
    bindings: {},
    controller: function($stateParams, $state, Rx, invoiceCountsActionCreator, store$, routesConfig) {
      var that = this;
      var sub = null;

      that.createTabItems = function (invoiceCounts) {
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
        that.isActiveInvoices = ($state.$current.name === routesConfig.INDEX.activeInvoices.name);

        sub = store$.subscribe(function(state) {
          if (!_.isEmpty(state.invoiceCounts)) {
            that.createTabItems(state.invoiceCounts);
            that.showLoading = false;
          }
        });

        if (!that.isActiveInvoices) {
          var action = invoiceCountsActionCreator.fetchInvoiceCounts(that.carrierId);
          store$.dispatch(action);
        }
      };

      that.$onDestroy = function() {
        sub.dispose();
      };
    }
  });
