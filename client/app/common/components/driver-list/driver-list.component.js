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
    that.pagination = null;
    that.showLoading = false;
    that.firstRecord = 0;

    function init() {
      that.getDriversForPage(1);
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
      that.showLoading = true;
      carrierService.fetchDrivers(1, page).then(function (drivers) {
        that.pagination = drivers.pagination;
        if(page === 1){
          that.firstRecordNumber = 1;
        } else{
          that.firstRecordNumber = (that.pagination.currentPage - 1) * that.pagination.recordsPerPage + 1;
        }
        that.drivers = drivers.data;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = init();
  }
});