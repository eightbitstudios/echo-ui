angular.module('echo.components.modal.assignDriver', [
  'echo.components.equipment',
  'echo.models.driver',
  'echo.api.loads',
  'echo.components.loadingButton',
  'echo.components.shippingDetails',
  'echo.components.modal.assignDriver.loadDriver',
  'echo.components.modal.assignDriver.enums.assignedDriver',
  'echo.components.modal.driverSidebar'
])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      equipment: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, DriverModel, assignedDriverEnum) {
      var that = this;

      that.states = assignedDriverEnum.state;

      that.newDriver = {};
      that.state = null;
      that.driverChanged = false;
      that.showButtonLoading = false;

      that.assignDriver = function () {
        that.showButtonLoading = true;
        loadsApi.assignDriver(that.load.loadNumber, that.newDriver.id).then(function () {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.reassignDriver = function () {
        that.showButtonLoading = true;
        loadsApi.reassignDriver(that.load.loadNumber, that.newDriver.id).then(function () {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.unassignDriver = function () {
        that.showButtonLoading = true;
        loadsApi.unassignDriver(that.load.loadNumber).then(function () {
          that.driverChanged = true;
          that.assignedDriver = null;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.noNewDriver = function () {
        return _.isUndefined(_.get(that.newDriver, 'id'));
      };

      that.noAssignedDriver = function () {
        return _.isUndefined(_.get(that.assignedDriver, 'id'));
      };

      that.$onInit = function () {
        that.assignedDriver = new DriverModel(that.load.driver);
      };
    }
  });