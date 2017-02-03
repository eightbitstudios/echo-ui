angular.module('echo.index.carrier.invoicing', [
  'echo.components.tabBar',
  'echo.config.routes',
  'echo.index.carrier.invoicing.activeInvoices'
])
  .component('invoicing', {
    templateUrl: 'app/pages/index/carrier/components/invoicing/invoicing.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function($stateParams, $state, routesConfig) {
      this.$onInit = function() {
        var that = this;

        that.stateParams = $stateParams;
        that.showLoading = true;
        that.state = $state;
        that.routesConfig = routesConfig;

        that.tabItems = [{
          title: 200 + ' Active Invoices',
          link: routesConfig.INDEX.activeInvoices.name
        }];
        that.showLoading = false;
      };
    }
  });
