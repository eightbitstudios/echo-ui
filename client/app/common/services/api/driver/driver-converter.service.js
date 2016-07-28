'use strict';

angular.module('echo.services.driverConverter', []).factory('driverConverterService', function () {
  return {
    driverRequest: function (driver) {
      var convertedDriver = {};
       _.assign(convertedDriver, driver);

       if(convertedDriver.otherLanguage){
         convertedDriver.language = convertedDriver.otherLanguage;
       }

       return _.omit(convertedDriver, 'otherLanguage');
    }
  };
});
