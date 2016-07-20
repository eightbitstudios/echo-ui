'use strict';

angular.module('echo.components.driverList', [
  'echo.components.typeaheadSearch',
  'echo.components.loading',
  'echo.components.pagination',
  'echo.services.carrier'
]).component('driversList', {
  templateUrl: 'app/common/components/driver-list/driver-list.template.html',
  controller: function (carrierService) {
    var that = this;
    that.drivers = null;
    that.numberOfPages = 0;
    that.showLoading = false;

    function init() {
      //that.showLoading = true;
      carrierService.fetchDrivers(1).then(function (drivers) {
       that.drivers = drivers;
        that.numberOfPages = 7;
      }).finally(function () {
        that.showLoading = true;
      });
    }

    that.searchDrivers = function(val){
      return carrierService.searchDrivers(1, val).then(function(drivers){
        return _.map(drivers, function(driver){
          return {
            id: driver.id,
            name: driver.getFullName()
          };
        });
      });
    };

    that.getDriversForPage = function (page) {
      //that.showLoading = true;
      carrierService.fetchDrivers(1, page).then(function (drivers) {
        that.drivers = drivers;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = init();
  }
});