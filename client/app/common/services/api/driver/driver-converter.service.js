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
       convertedDriver.phoneNumber = _.replace(driver.phone, /\s|\-|\(|\)/g, '');

       return _.omit(convertedDriver, ['otherLanguage', 'phone', 'role']);
    }
  };
});
