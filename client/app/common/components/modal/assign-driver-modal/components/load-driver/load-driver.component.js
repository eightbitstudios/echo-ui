angular.module('echo.components.modal.assignDriver.loadDriver', [
    'echo.components.modal.assignDriver.unassignedDriver',
    'echo.components.modal.assignDriver.newDriver',
    'echo.models.driver',
    'echo.components.modal.assignDriver.assignedDriverProfile',
    'echo.components.modal.assignDriver.enums.assignedDriver'
  ])
  .component('loadDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/load-driver/load-driver.component.html',
    bindings: {
      assignedDriver: '<',
      state: '=',
      newDriver: '=',
      carrierId: '<',
      loadId: '<',
      submitControl: '='
    },
    controller: function(DriverModel, assignedDriverEnum) {

      this.cancelNewDriver = function() {
        this.state = this.states.unassignedDriver;
      };

      this.inviteNewDriver = function() {
        this.state = this.states.newDriver;
      };

      this.changeDriver = function() {
        this.state = this.states.unassignedDriver;
      };

      this.newDriverCreated = function(driver) {
        this.state = this.states.unassignedDriver;
        this.setNewDriver(driver);
      };

      this.setNewDriver = function(driver) {
        this.newDriver = new DriverModel(driver);
      };

      this.$onInit = function() {
        this.states = assignedDriverEnum.state;
        if (_.get(this.assignedDriver, 'id')) {
          this.state = this.states.assignedDriverProfile;
        } else {
          this.state = this.states.unassignedDriver;
        }
      };
    }
  });