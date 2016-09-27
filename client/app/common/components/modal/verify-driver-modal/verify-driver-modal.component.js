angular.module('echo.components.modal.verifyDriver', [
  'echo.models.driver',
  'echo.api.loads',
  'echo.components.loadingButton',
  'echo.components.unassignedDriverSearch',
  'echo.config.routes',
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
  'echo.components.modal.driverSidebar'
])
  .component('verifyDriverModal', {
    templateUrl: 'app/common/components/modal/verify-driver-modal/verify-driver-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<',
      verifiedDriver: '<',
      equipment: '<'
    },
    controller: function (loadsApi, DriverModel, routesConfig) {
      var that = this;

      that.modes = {
        findDriver: 1,
        inviteNewDriver: 2
      };

      that.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;

      that.showPossibleMatchText = !_.isUndefined(_.get(that.verifiedDriver, 'id'));
      that.showFindDriver = function () {
        that.currentState = that.modes.findDriver;
      };

      that.showInviteNewDriver = function () {
        that.currentState = that.modes.inviteNewDriver;
      };

      that.verifyDriver = function () {
        that.showButtonLoading = true;
        loadsApi.reassignDriver(that.load.loadNumber, that.verifiedDriver.id).then(function () {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).finally(function () {
          that.showButtonLoading = false;
        });
      };

      that.invitedNewDriver = function(driver) {
        that.verifiedDriver = driver;
        that.showFindDriver();
      };

      that.noVerifiedDriver = function () {
        return _.isUndefined(_.get(that.verifiedDriver, 'id'));
      };

      that.$onInit = function () {
        that.state = null;
        that.driverChanged = false;
        that.showButtonLoading = false;
        that.unverifiedDriver = new DriverModel(that.load.driver);
        that.currentState = that.modes.findDriver;
      };
    }
  });