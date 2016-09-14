angular.module('echo.components.modal.verifyDriver', [
  'echo.components.equipment',
  'echo.models.driver',
  'echo.api.loads',
  'echo.components.loadingButton',
  'echo.components.shippingDetails',
  'echo.components.modal.assignDriver.loadDriver',
  'echo.components.unassignedDriverSearch'
])
  .component('verifyDriverModal', {
    templateUrl: 'app/common/components/modal/verify-driver-modal/verify-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<'
    },
    controller: function (loadsApi, DriverModel) {
      var that = this;

      that.verifiedDriver = null;

      that.state = null;
      that.driverChanged = false;
      that.showButtonLoading = false;

      that.verifyDriver = function () {
        that.showButtonLoading = true;
        loadsApi.assignDriver(that.load.loadNumber, that.verifiedDriver.id).then(function () {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.noVerifiedDriver = function () {
        return _.isUndefined(_.get(that.verifiedDriver, 'id'));
      };

      that.$onInit = function () {
        that.unverifiedDriver = new DriverModel(that.load.driver);
      };
    }
  });