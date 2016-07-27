'use strict';

angular.module('echo.components.driverProfile', [
  'echo.directives.phoneNumberMask',
  'echo.models.driver',
  'echo.api.driver'
]).component('driverProfile', {
  bindings: {
    carrierId: '<'
  },
  templateUrl: 'app/common/components/driver-profile/driver-profile.template.html',
  controller: function (DriverModel, driverApi) {
    var that = this;

    that.driver = new DriverModel();

    that.saveDriverHandler = function() {
      driverApi.upsertDriver(that.carrierId, that.driver);
    };
  }
});