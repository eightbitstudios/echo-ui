angular.module('echo.components.loadTable.driver', [
  'echo.filters.phoneNumber',
  'echo.filters.firstCharacter',
  'echo.filters.onOff',
  'echo.filters.driverStatus',
  'echo.services.modal',
  'echo.components.modal.assignDriver',
  'echo.components.modal.verifyDriver'
])
  .component('driver', {
    templateUrl: 'app/common/components/load-table/components/driver/driver.template.html',
    bindings: {
      load: '<',
      loadType: '<',
      carrierId: '<',
      driverChangedCallback: '&'
    },
    controller: function ($q, loadTypesEnum, modalService, loadsApi) {
      var that = this;
      that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
      that.loadTypesEnum = loadTypesEnum;

      that.showVerifyDriverModal = function () {
        $q.all([loadsApi.fetchEquipmentByLoadId(that.load.loadNumber)]).then(_.spread(function (equipment) {
          var modalInstance = modalService.open({
            component: 'verify-driver-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              verifiedDriver: {
                id: 1,
                firstName: 'Ted',
                lastName: 'Test'
              },
              equipment: equipment
            }
          }).result;

          modalInstance.then(function (driverChanged) {
            if (driverChanged) {
              that.driverChangedCallback();
            }
          });
        }));
      };

      that.showAssignDriverModal = function () {
        loadsApi.fetchEquipmentByLoadId(that.load.loadNumber).then(function (equipment) {
          var modalInstance = modalService.open({
            component: 'assign-driver-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              equipment: equipment
            }
          }).result;

          modalInstance.then(function (driverChanged) {
            if (driverChanged) {
              that.driverChangedCallback();
            }
          });
        });
      };
    }
  });
