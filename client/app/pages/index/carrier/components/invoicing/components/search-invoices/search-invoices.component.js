angular.module('echo.index.carrier.invoicing.searchInvoices', [
  'echo.index.carrier.invoicing.invoiceTable',
  'echo.api.invoices',
  'echo.components.echoRepContact',
  'echo.models.paging',
  'echo.components.pagination',
  'echo.config.appConstants'
]).component('searchInvoices', {
  templateUrl: 'app/pages/index/carrier/components/invoicing/components/search-invoices/search-invoices.template.html',
  bindings: {},
  controller: function($state, $stateParams, store$, routesConfig, invoicesApi, PagingModel, appConstants) {
    var that = this;

    that.getInvoicesBySearchText = function() {
      that.paging.reset();
      that.getInvoices();
    };

    that.getInvoices = function() {

      that.showLoading = true;
      invoicesApi.fetchInvoicesBySearchText(that.carrierId, that.searchText, that.paging).then(function(searchInvoices) {
        that.paging.totalRecords = searchInvoices.count;
        that.paging.recordCount = _.size(searchInvoices.invoices);
        that.invoices = searchInvoices.invoices;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    that.$onInit = function() {
      var state = store$.getState();

      that.showLoading = false;
      that.repDetails = state.rep;
      that.carrierId = state.carrier.carrierId;
      that.searchText = $stateParams.searchText;
      that.routesConfig = routesConfig;
      that.invoiceCount = 0;
      that.previousRouteName = _.get($state.previous, 'data.name');
      that.previousRoute = _.get($state.previous, 'name');
      that.paging = new PagingModel(appConstants.LIMIT.invoicesList);

      that.getInvoicesBySearchText();
    };
  }
});
