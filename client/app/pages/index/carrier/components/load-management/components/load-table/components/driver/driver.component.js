angular.module('echo.index.carrier.loadManagement.loadTable.driver', [
  'echo.filters.phoneNumber',
  'echo.filters.firstCharacter',
  'echo.enums.loadTypes',
  'echo.filters.onOff',
  'echo.filters.driverStatus',
  'echo.services.modal',
  'echo.components.modal.assignDriver'
])
  .component('driver', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-table/components/driver/driver.template.html',
    bindings: {
      load: '<',
      loadType: '<',
      carrierId: '<'
    },
    controller: function (loadTypesEnum, modalService) {
      var that = this;

      that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
      that.loadTypesEnum = loadTypesEnum;
      that.showAssignDriverModal = function () {
        modalService.open({
          component: 'assign-driver-modal',
          bindings: {
            load: that.load,
            carrierId: that.carrierId
          }
        });
      };
    }
  });
