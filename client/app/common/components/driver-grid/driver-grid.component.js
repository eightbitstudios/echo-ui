'use strict';

angular.module('echo.components.driverGrid', [
  'echo.components.typeaheadSearch',
  'echo.components.loading',
  'echo.config.appConstants',
  'echo.components.pagination',
  'echo.directives.dateRangePicker',
  'echo.api.carrier'
]).component('driverGrid', {
  bindings: {
    carrierId: '<'
  },
  templateUrl: 'app/common/components/driver-grid/driver-grid.template.html',
  controller: function (carrierApi, appConstants) {
    var that = this;
    that.drivers = null;
    that.pagination = null;
    that.showLoading = false;
    that.firstRecord = 0;
    that.startDate = null;
    that.endDate = null;

    /**
     * Controller init
     */
    function init(changeObject) {
      if(changeObject.carrierId && changeObject.carrierId.currentValue){
        that.getDriversForPage(appConstants.PAGINATION.defaultPage);
      }
    }

    /**
     * Call api to search for drivers
     * @param {string} val - Search text
     * @retuns {Promise} - List of drivers formatted for typeahead search
     */
    that.searchDrivers = function (val) {
      return carrierApi.searchDrivers(that.carrierId, val).then(function (drivers) {
        return _.map(drivers.data, function (driver) {
          return {
            id: driver.id,
            name: driver.getFullName()
          };
        });
      });
    };

    /**
     * Returns text for filter
     * @example Availability 10/15/2015 - 11/12/2015
     */
    that.formatDateText = function (){
      return 'Availability ' + _.join([moment(that.startDate).format('MM/DD/YY'),moment(that.endDate).format('MM/DD/YY')], ' - ');
    };

    /**
     * Clears out filter dates
     * @param {Object} $event - JQuery event
     */
    that.clearDates = function($event) {
      that.startDate = null;
      that.endDate = null;
      $event.stopPropagation();
    };

    /**
     * Calls api to fetch a list of drivers 
     * @param {number} page - Page number
     */
    that.getDriversForPage = function (page) {
      that.showLoading = true;
      carrierApi.fetchDrivers(that.carrierId, page).then(function (drivers) {
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

    that.$onChanges = init;
  }
});