'use strict';

angular.module('echo.components.driverProfile', [
  'echo.directives.phoneNumberMask',
  'echo.models.driver',
  'echo.config.appConstants',
  'echo.api.driver'
]).component('driverProfile', {
  bindings: {
    carrierId: '<',
    driver: '<',
    languages: '<',
    profileUpdatedHandler: '&'
  },
  templateUrl: 'app/common/components/driver-profile/driver-profile.template.html',
  controller: function (DriverModel, driverApi, appConstants) {
    var that = this;

    that.driverProfileForm = null;
    that.showButtonLoading = false;
    that.showConfirmation = false;
    that.other = appConstants.LANGUAGES.other;

    // Check to see if user has a language that is not listed
    if(!_.find(that.languages, {language: that.driver.language})){
      that.driver.otherLanguage = that.driver.language;
      that.driver.language = appConstants.LANGUAGES.other;
    }

    that.saveDriverHandler = function () {
      if (that.driverProfileForm.$valid) {
        that.serverError = null;
        that.showButtonLoading = true;
        driverApi.upsertDriver(that.carrierId, that.driver).then(function () {
          that.profileUpdatedHandler();
        }).catch(function(errorMessage){
          that.serverError = errorMessage;
        }).finally(function () {
          that.showButtonLoading = false;
        });
      }
    };

    that.toggleConfirmation = function () {
      that.showConfirmation = !that.showConfirmation;
    };

    that.removeUserHandler = function () {
      that.showButtonLoading = true;
      driverApi.deactivateDriverById(that.carrierId, that.driver).then(function () {
        that.profileUpdatedHandler();
      }).finally(function () {
        that.showButtonLoading = false;
        that.showConfirmation = false;
      });
    };
  }
});