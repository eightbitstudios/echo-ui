'use strict';

angular.module('echo.components.driverGrid', [
  'echo.components.typeaheadSearch',
  'echo.components.loading',
  'echo.config.appConstants',
  'echo.components.pagination',
  'echo.directives.dateRangePicker',
  'echo.services.carrier'
]).component('driverGrid', {
  templateUrl: 'app/common/components/driver-grid/driver-grid.template.html',
  controller: function (carrierService, appConstants) {
    var that = this;
    that.drivers = null;
    that.pagination = null;
    that.showLoading = false;
    that.firstRecord = 0;
    that.startDate = null;
    that.endDate = null;

    function init() {
      that.getDriversForPage(appConstants.PAGINATION.defaultPage);
    }

    /**
     * Call api to search for drivers
     * @param {string} val - Search text
     * @retuns {Promise} - List of drivers formatted for typeahead search
     */
    that.searchDrivers = function (val) {
      return carrierService.searchDrivers(1, val).then(function (drivers) {
        return _.map(drivers, function (driver) {
          return {
            id: driver.id,
            name: driver.getFullName()
          };
        });
      });
    };

    /**
     * Calls api to fetch a list of drivers 
     * @param {number} page - Page number
     */
    that.getDriversForPage = function (page) {
      that.showLoading = true;
      carrierService.fetchDrivers(1, page).then(function (drivers) {
        that.pagination = drivers.pagination;

        if (page === 1) {
          that.firstRecordNumber = 1; //Default first record to one
        } else {
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