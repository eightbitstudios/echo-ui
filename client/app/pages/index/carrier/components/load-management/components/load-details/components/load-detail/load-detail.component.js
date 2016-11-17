angular.module('echo.index.carrier.loadManagement.loadDetails.loadDetail', [
  'echo.index.carrier.loadManagement.loadDetails.loadDetail.proNumber',
  'echo.enums.loadTypes'
])
  .component('loadDetail', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/load-detail/load-detail.template.html',
    bindings: {
      loadDetail: '=',
      carrierId: '<',
      repDetails: '<'
    },
    controller: function ($state, loadTypesEnum) {
      var that = this;
      that.loadType = loadTypesEnum.ACTIVE;
      that.reloadState = function () {
        $state.reload();
      };
      
      that.isMultiStop = _.size(that.loadDetail.pickUp) > 1 || _.size(that.loadDetail.delivery) > 1;
    }
  });
