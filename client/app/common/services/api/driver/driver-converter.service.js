'use strict';

angular.module('echo.services.driverConverter', []).factory('driverConverterService', function () {
  return {
    driverRequest: function (driver, carrierId) {
      var convertedDriver = {};
       _.assign(convertedDriver, driver);

       if(convertedDriver.otherLanguage){
         convertedDriver.language = convertedDriver.otherLanguage;
       }

       convertedDriver.carrierId = carrierId;
       convertedDriver.phoneNumber = driver.phone;

       return _.omit(convertedDriver, ['otherLanguage', 'phone']);
    }
  };
});
