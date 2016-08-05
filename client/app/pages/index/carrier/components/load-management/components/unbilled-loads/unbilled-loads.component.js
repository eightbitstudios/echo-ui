angular.module('echo.index.carrier.loadManagement.unbilledLoads', [
  'echo.index.carrier.loadManagement.loadTable',
  'echo.components.echoRepContact',
  'echo.api.loads',
  'echo.components.pagination',
  'echo.models.paging'
])
  .component('unbilledLoads', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/unbilled-loads/unbilled-loads.template.html',
    bindings: {
      repDetails: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, PagingModel) {
      var that = this;
      that.showLoading = false;
      that.paging = new PagingModel(10);

      that.getUnbilledLoads = function () {
        that.showLoading = true;
        loadsApi.fetchUnbilledLoads(that.carrierId, that.paging).then(function (unbilledLoadData) {
          that.paging.totalRecords = unbilledLoadData.totalRecords;
          that.activeLoads = unbilledLoadData.data;
        }).finally(function () {
          that.showLoading = false;
        });
      };

      that.$onInit = that.getUnbilledLoads;
    }
  });
