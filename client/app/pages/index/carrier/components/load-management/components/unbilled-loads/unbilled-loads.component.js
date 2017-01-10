angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.components.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.models.paging',
  'echo.components.pagination',
  'echo.config.appConstants',
  'echo.index.carrier.loadManagement.loadsFilter',
  'echo.enums.loadTypes',
  'echo.components.filterButton'
]).component('unbilledLoads', {
  templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
  bindings: {
    repDetails: '<',
    carrierId: '<'
  },
  controller: function(loadsApi, PagingModel, appConstants, loadTypesEnum) {

    this.getUnbilledLoads = function() {
      var that = this;
      that.showLoading = true;
      loadsApi.fetchUnbilledLoads(that.carrierId, that.paging, that.isPODNeeded, that.isInvoiceNeeded).then(function(unbilledLoadData) {
        that.paging.totalRecords = unbilledLoadData.totalLoadCount;
        that.paging.recordCount = _.size(unbilledLoadData.loads);
        that.unbilledLoads = unbilledLoadData.loads;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    this.invoiceNeededHandler = function(value) {
      if (!value) {
        this.filterText = this.defaultFilterText;
      } else {
        this.filterText = 'By Invoice Needed';
      }
      this.isPODNeeded = false;
      this.isInvoiceNeeded = value;
      this.paging.reset();
      this.getUnbilledLoads();
    };

    this.podNeededHandler = function(value) {
      if (!value) {
        this.filterText = this.defaultFilterText;
      } else {
        this.filterText = 'By POD Needed';
      }
      this.isInvoiceNeeded = false;
      this.isPODNeeded = value;
      this.paging.reset();
      this.getUnbilledLoads();
    };

    this.$onInit = function() {
      this.showLoading = false;
      this.paging = new PagingModel(appConstants.LIMIT.loadsList);
      this.isInvoiceNeeded = false;
      this.loadType = loadTypesEnum.UNBILLED;
      this.isPODNeeded = false;
      this.defaultFilterText = 'By Last Delivery Stop';
      this.filterText = this.defaultFilterText;

      this.getUnbilledLoads();
    };
  }
});