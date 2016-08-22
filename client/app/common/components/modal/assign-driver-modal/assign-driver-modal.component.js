angular.module('echo.components.modal.assignDriver', [
  'echo.components.equipment',
  'echo.models.driver',
  'echo.components.shippingDetails',
  'echo.components.modal.assignDriver.loadDriver'
])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<'
    },
    controller: function (DriverModel) {
      var that = this;

      that.states = {
        unassignedDriver: 1,
        newDriver: 2,
        assignedDriverProfile: 3
      };

      that.newDriver = null;

      that.newDriverSelected = function (driver) {
        that.newDriver = driver;
      };

      that.state = null;

      that.$onInit = function () {
        that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
        that.driver = new DriverModel(that.load.driver);
      };
    }
  });