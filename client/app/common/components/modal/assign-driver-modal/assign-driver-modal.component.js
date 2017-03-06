angular.module('echo.components.modal.assignDriver', [
    'echo.components.equipment',
    'echo.models.driver',
    'echo.api.loads',
    'echo.components.loadingButton',
    'echo.components.shippingDetails',
    'echo.components.modal.assignDriver.loadDriver',
    'echo.components.modal.assignDriver.enums.assignedDriver',
    'echo.components.modal.driverSidebar',
    'echo.components.modal.errorMessages'
  ])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      equipment: '<',
      carrierId: '<'
    },
    controller: function(loadsApi, DriverModel, assignedDriverEnum) {


      this.assignDriver = function() {
        var that = this;
        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.assignDriver(that.load.loadNumber, that.newDriver.id).then(function() {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.reassignDriver = function() {
        var that = this;
        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.reassignDriver(that.load.loadNumber, that.newDriver.id).then(function() {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.unassignDriver = function() {
        var that = this;
        that.showButtonLoading = true;
        that.errorMessages = null;
        that.errorCode = null;
        loadsApi.unassignDriver(that.load.loadNumber).then(function() {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).catch(function(status) {
          that.errorMessages = status.message;
          that.errorCode = status.code;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.noNewDriver = function() {
        return _.isUndefined(_.get(this.newDriver, 'id'));
      };

      this.noAssignedDriver = function() {
        return _.isUndefined(_.get(this.assignedDriver, 'id'));
      };

      this.disableAssignButton = function() {
        return (this.noAssignedDriver() && this.noNewDriver()) ||
          (!this.submitControl && (this.noAssignedDriver() || !this.noNewDriver())) ||
          this.state === this.states.newDriver;
      };

      this.$onInit = function() {
        this.states = assignedDriverEnum.state;
        this.newDriver = {};
        this.state = null;
        this.driverChanged = false;
        this.showButtonLoading = false;
        this.assignedDriver = new DriverModel(this.load.driver);
        this.submitControl = true;
      };
    }
  });