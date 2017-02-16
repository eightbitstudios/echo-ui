angular.module('echo.components.modal.assignDriver.newDriver', [
    'echo.models.driver',
    'echo.config.appConstants',
    'echo.components.driverProfile',
    'echo.api.driver',
    'echo.api.language',
    'echo.components.serverErrors'
  ])
  .component('newDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/new-driver/new-driver.template.html',
    bindings: {
      cancelCallback: '&',
      continueCallback: '&',
      carrierId: '<'
    },
    controller: function(languageApi, driverApi, DriverModel, appConstants) {

      this.saveNewDriver = function() {
        var that = this;
        if (!_.isEmpty(that.newDriver.firstName) && !_.isEmpty(that.newDriver.phone)) {
          that.showLoading = true;
          driverApi.insertDriver(that.carrierId, that.newDriver).then(function(newDriver) {
            that.continueCallback({
              driver: newDriver
            });
          }).catch(function(errorMessage) {
            that.serverError = errorMessage;
          }).finally(function() {
            that.showLoading = false;
          });
        }
      };

      this.$onInit = function() {
        var that = this;
        that.newDriver = new DriverModel();
        that.showLoading = true;
        that.errorMessageOverride = appConstants.ERROR_MESSAGES.DRIVER;
        languageApi.fetchLanguages().then(function(languages) {
          that.languages = languages;
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });
