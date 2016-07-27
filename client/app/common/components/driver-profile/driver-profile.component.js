'use strict';

angular.module('echo.components.driverProfile', [
  'echo.directives.phoneNumberMask',
  'echo.models.driver',
  'echo.api.driver'
]).component('driverProfile', {
  bindings: {
    carrierId: '<',
    driver: '<',
    languages: '<',
    profileUpdatedHandler: '&'
  },
  templateUrl: 'app/common/components/driver-profile/driver-profile.template.html',
  controller: function (DriverModel, driverApi) {
    var that = this;

    that.driverProfileForm = null;
    that.showButtonLoading = false;
    that.showConfirmation = false;

    that.saveDriverHandler = function () {
      if (that.driverProfileForm.$valid) {
        that.showButtonLoading = true;
        driverApi.upsertDriver(that.carrierId, that.driver).then(function () {
          that.profileUpdatedHandler();
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