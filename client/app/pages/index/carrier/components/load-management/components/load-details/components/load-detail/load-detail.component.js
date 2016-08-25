angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail', [
  'echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber'
])
  .component('loadDetail', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/load-detail.template.html',
    bindings: {
      loadDetail: '<'
    },
    controller: function () {
    }
  });
