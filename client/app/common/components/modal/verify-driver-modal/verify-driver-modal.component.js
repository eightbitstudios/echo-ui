angular.module('echo.components.modal.verifyDriver', [
    'echo.models.driver',
    'echo.api.loads',
    'echo.components.loadingButton',
    'echo.components.unassignedDriverSearch',
    'echo.config.routes',
    'echo.filters.firstCharacter',
    'echo.filters.phoneNumber',
    'echo.components.modal.driverSidebar',
    'echo.components.modal.errorMessages'
  ])
  .component('verifyDriverModal', {
    templateUrl: 'app/common/components/modal/verify-driver-modal/verify-driver-modal.component.html',
    bindings: {
      modalActions: '<',
      load: '<',
      carrierId: '<',
      verifiedDriver: '<',
      equipment: '<'
    },
    controller: function(loadsApi, DriverModel, routesConfig) {

      this.showFindDriver = function() {
        this.currentState = this.modes.findDriver;
      };

      this.showInviteNewDriver = function() {
        this.currentState = this.modes.inviteNewDriver;
      };

      this.verifyDriver = function() {
        var that = this;

        that.showButtonLoading = true;
        that.errorCode = null;
        that.errorMessages = null;
        loadsApi.reassignDriver(that.load.loadNumber, that.verifiedDriver.id).then(function() {
          that.driverChanged = true;
          that.modalActions.close(that.driverChanged);
        }).catch(function(errorStatus) {
          that.errorCode = errorStatus.code;
          that.errorMessages = errorStatus.message;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      };

      this.invitedNewDriver = function(driver) {
        this.verifiedDriver = driver;
        this.showFindDriver();
      };

      this.noVerifiedDriver = function() {
        return _.isUndefined(_.get(this.verifiedDriver, 'id'));
      };

      this.$onInit = function() {
        this.modes = {
          findDriver: 1,
          inviteNewDriver: 2
        };

        this.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;
        this.showPossibleMatchText = !_.isUndefined(_.get(this.verifiedDriver, 'id'));
        this.state = null;
        this.driverChanged = false;
        this.showButtonLoading = false;
        this.errorCode = null;
        this.errorMessages = null;
        this.unverifiedDriver = new DriverModel(this.load.driver);
        this.currentState = this.modes.findDriver;
      };
    }
  });