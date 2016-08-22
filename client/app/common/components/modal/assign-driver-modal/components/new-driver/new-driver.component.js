angular.module('echo.components.modal.assignDriver.newDriver', [
  'echo.models.driver',
  'echo.components.driverProfile',
  'echo.api.driver',
  'echo.api.language'
])
  .component('newDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/new-driver/new-driver.template.html',
    bindings: {
      cancelCallback: '&',
      continueCallback: '&',
      carrierId: '<'
    },
    controller: function (languageApi, driverApi, DriverModel) {
      var that = this;

      that.newDriver = new DriverModel();

      that.saveNewDriver = function() {
        that.showLoading = true;
        driverApi.insertDriver(that.carrierId, that.newDriver).then(function(newDriver) {
          that.continueCallback({driver: newDriver});
        }).finally(function() {
          that.showLoading = false;
        });
      };

      that.$onInit = function() {
        that.showLoading = true;
        languageApi.fetchLanguages().then(function(languages){
          that.languages = languages;
        }).finally(function() {
          that.showLoading = false;
        });
      };
    }
  });