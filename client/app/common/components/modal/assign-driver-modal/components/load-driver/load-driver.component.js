angular.module('echo.components.modal.assignDriver.loadDriver', [
  'echo.components.modal.assignDriver.unassignedDriver',
  'echo.components.modal.assignDriver.newDriver',
  'echo.models.driver',
  'echo.components.modal.assignDriver.assignedDriverProfile'
])
  .component('loadDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/load-driver/load-driver.template.html',
    bindings: {
      driver: '<',
      state: '=',
      newDriverCallback: '&',
      carrierId: '<'
    },
    controller: function (DriverModel) {
      var that = this;

      that.states = {
        unassignedDriver: 1,
        newDriver: 2,
        assignedDriverProfile: 3
      };

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
        that.newDriver = new DriverModel(driver);
        that.setNewDriver(driver);
      };

      that.setNewDriver = function (driver) {
        that.newDriverCallback({driver: driver});
      };

      that.$onInit = function () {
        if (that.driver.id) {
          that.state = that.states.assignedDriverProfile;
        } else {
          that.state = that.states.unassignedDriver;
        }
      };
    }
  });