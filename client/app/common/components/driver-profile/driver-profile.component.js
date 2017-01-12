'use strict';

angular.module('echo.components.driverProfile', [
  'echo.config.appConstants',
  'echo.api.driver',
  'echo.components.serverErrors',
  'echo.filters.fullName',
  'echo.directives.focus'
]).component('driverProfile', {
  bindings: {
    carrierId: '<',
    driver: '<',
    languages: '<',
    profileUpdatedHandler: '&'
  },
  templateUrl: 'app/common/components/driver-profile/driver-profile.template.html',
  controller: function(driverApi, appConstants) {
    this.saveDriverHandler = function() {
      var that = this;

      if (that.driverProfileForm.$valid) {
        that.serverError = null;
        that.showButtonLoading = true;
        if (that.driver.preferredLanguage !== appConstants.LANGUAGES.other) {
          delete that.driver.otherLanguage;
        }

        driverApi.upsertDriver(that.carrierId, that.driver).then(function() {
          that.profileUpdatedHandler();
        }).catch(function(errorMessage) {
          that.serverError = errorMessage;
        }).finally(function() {
          that.showButtonLoading = false;
        });
      }
    };

    this.toggleConfirmation = function() {
      this.showConfirmation = !this.showConfirmation;
    };

    this.removeUserHandler = function() {
      var that = this;
      that.showButtonLoading = true;
      driverApi.deactivateDriverById(that.carrierId, that.driver).then(function() {
        that.profileUpdatedHandler();
      }).finally(function() {
        that.showButtonLoading = false;
        that.showConfirmation = false;
      });
    };

    this.$onInit = function() {
      var that = this;

      that.driverProfileForm = null;
      that.showButtonLoading = false;
      that.showConfirmation = false;
      that.other = appConstants.LANGUAGES.other;
      that.errorMessageOverride = appConstants.ERROR_MESSAGES.DRIVER;

      // Check to see if user has a language that is not listed
      if (!_.find(that.languages, {
          language: _.get(that.driver, 'preferredLanguage')
        })) {
        that.driver.otherLanguage = that.driver.preferredLanguage;
        that.driver.preferredLanguage = appConstants.LANGUAGES.other;
      }
    };
  }
});