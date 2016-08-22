angular.module('echo.components.modal.assignDriver', [
  'echo.components.equipment',
  'echo.models.driver',
  'echo.api.loads',
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
    controller: function (loadsApi, DriverModel) {
      var that = this;

      that.states = {
        unassignedDriver: 1,
        newDriver: 2,
        assignedDriverProfile: 3
      };

      that.newDriver = null;
      that.state = null;

      that.newDriverSelected = function (driver) {
        that.newDriver = driver;
      };

      that.assignDriver = function () {
        loadsApi.assignDriver(that.load.loadNumber, that.newDriver.id);
      };

      that.reassignDriver = function () {
        loadsApi.reassignDriver(that.load.loadNumber, that.newDriver.id);
      };

      that.unassignDriver = function () {
        loadsApi.unassignDriver(that.load.loadNumber);
      };

      that.$onInit = function () {
        that.noDriver = _.isUndefined(_.get(that.load.driver, 'id'));
        that.driver = new DriverModel(that.load.driver);
      };
    }
  });