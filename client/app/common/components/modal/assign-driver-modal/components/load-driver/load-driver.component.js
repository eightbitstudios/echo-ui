angular.module('echo.components.modal.assignDriver.loadDriver', [
  'echo.components.modal.assignDriver.unassignedDriver',
  'echo.components.modal.assignDriver.newDriver',
  'echo.models.driver',
  'echo.components.modal.assignDriver.assignedDriverProfile',
  'echo.components.modal.assignDriver.enums.assignedDriver'
])
  .component('loadDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/load-driver/load-driver.template.html',
    bindings: {
      assignedDriver: '<',
      state: '=',
      newDriver: '=',
      carrierId: '<',
      loadId: '<'
    },
    controller: function (DriverModel, assignedDriverEnum) {
      var that = this;

      that.states = assignedDriverEnum.state;

      that.cancelNewDriver = function () {
        that.state = that.states.unassignedDriver;
      };

      that.inviteNewDriver = function () {
        that.state = that.states.newDriver;
      };

      that.changeDriver = function () {
        that.state = that.states.unassignedDriver;
      };

      that.newDriverCreated = function (driver) {
        that.state = that.states.unassignedDriver;
        that.setNewDriver(driver);
      };

      that.setNewDriver = function (driver) {
        that.newDriver = new DriverModel(driver);
      };

      that.$onInit = function () {
        if (_.get(that.assignedDriver, 'id')) {
          that.state = that.states.assignedDriverProfile;
        } else {
          that.state = that.states.unassignedDriver;
        }
      };
    }
  });