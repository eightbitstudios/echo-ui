'use strict';

angular.module('echo.index.resolvers.driverProfile', [
  'echo.api.driver',
  'echo.api.language',
  'echo.models.driver'
])
  .factory('driverProfileResolver', function (languageApi, driverApi, DriverModel) {
    return {
      driverId: function ($stateParams) {
        return $stateParams.driverId;
      },
      driver: function (carrierId, driverId) {
        return driverId ? driverApi.fetchDriverById(carrierId, driverId) : new DriverModel();
      },
      languages: function () {
        return languageApi.fetchLanguages();
      }
    };
  });