'use strict';

angular.module('echo.services.driverConverter', []).factory('driverConverterService', function () {
  return {
    driverRequest: function (driver, carrierId) {
      var convertedDriver = {};
      _.assign(convertedDriver, driver);

      if (convertedDriver.otherLanguage) {
        convertedDriver.preferredLanguage = convertedDriver.otherLanguage;
      }

      convertedDriver.carrierId = carrierId;
      convertedDriver.phoneNumber = '1' + driver.phone; //Add international code for frontend. Is static for now

      return _.omit(convertedDriver, ['otherLanguage', 'phone', 'role']);
    },
    driverResponse: function (driver) {
      // Strip international code for frontend
      if (driver.phone && driver.phone.charAt(0) === '1') {
        driver.phone = driver.phone.slice(1);
      }

      return driver;
    },
  };
});
