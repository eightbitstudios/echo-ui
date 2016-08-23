angular.module('echo.components.modal.assignDriver', [
  'echo.components.equipment',
  'echo.models.driver',
  'echo.api.loads',
  'echo.components.shippingDetails',
  'echo.components.modal.assignDriver.loadDriver',
  'echo.components.modal.assignDriver.enums.assignedDriver'
])
  .component('assignDriverModal', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, DriverModel, assignedDriverEnum) {
      var that = this;

      that.states = assignedDriverEnum.state;

      that.newDriver = {};
      that.state = null;

      that.assignDriver = function () {
        loadsApi.assignDriver(that.load.loadNumber, that.newDriver.id).then(function () {
          that.modalActions.close();
        });
      };

      that.reassignDriver = function () {
        loadsApi.reassignDriver(that.load.loadNumber, that.newDriver.id).then(function () {
          that.modalActions.close();
        });
      };

      that.unassignDriver = function () {
        loadsApi.unassignDriver(that.load.loadNumber).then(function () {
          that.assignedDriver = null;
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