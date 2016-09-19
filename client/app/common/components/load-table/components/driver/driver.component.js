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
    controller: function ($q, loadTypesEnum, modalService, loadsApi, driverApi) {
      var that = this;
      that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
      that.loadTypesEnum = loadTypesEnum;

      that.showVerifyDriverModal = function () {
        $q.all([driverApi.verifyDriverByPhone(that.carrierId, that.load.driver.phone), 
        loadsApi.fetchEquipmentByLoadId(that.load.loadNumber)]).then(_.spread(function (verifiedDriver, equipment) {
          var modalInstance = modalService.open({
            component: 'verify-driver-modal',
            bindings: {
              load: that.load,
              carrierId: that.carrierId,
              verifiedDriver: verifiedDriver,
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
        that.showButtonLoading = true;
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
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };
    }
  });
