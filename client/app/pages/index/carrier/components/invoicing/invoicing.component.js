angular.module('echo.index.carrier.invoicing', [
  'echo.components.tabBar',
  'echo.config.routes',
  'echo.index.carrier.invoicing.activeInvoices',
  'echo.services.invoicingCount'
])
  .component('invoicing', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/invoicing.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function($stateParams, $state, routesConfig, invoicingCountService) {
      this.$onInit = function() {
        var that = this;

        that.stateParams = $stateParams;
        that.showLoading = true;
        that.state = $state;
        that.routesConfig = routesConfig;
        that.isActiveInvoices = ($state.$current.name === routesConfig.INDEX.activeInvoices.name);

        invoicingCountService.fetchInvoiceCount(that.carrierId, that.isActiveInvoices).then(function(invoiceCounts) {
          that.tabItems = [{
            title: invoiceCounts.activeInvoices + ' Active Invoices',
            link: routesConfig.INDEX.activeInvoices.name
          }];
        }).finally(function () {
          that.showLoading = false;
        });
      };
    }
  });
