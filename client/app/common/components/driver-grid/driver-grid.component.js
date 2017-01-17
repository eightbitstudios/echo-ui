'use strict';

angular.module('echo.components.driverGrid', [
  'echo.components.typeaheadSearch',
  'echo.components.loading',
  'echo.config.routes',
  'echo.components.pagination',
  'echo.directives.dateRangePicker',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.components.driverGrid.driverAssignment',
  'echo.api.carrier',
  'echo.filters.fullName'
]).component('driverGrid', {
  bindings: {
    carrierId: '<'
  },
  templateUrl: 'app/common/components/driver-grid/driver-grid.template.html',
  controller: function($state, $filter, routesConfig, carrierApi, PagingModel, appConstants) {

    /**
     * Call api to search for drivers
     * @param {string} val - Search text
     * @retuns {Promise} - List of drivers formatted for typeahead search
     */
    this.searchDrivers = function(val) {
      var that = this;
      return carrierApi.searchDrivers(that.carrierId, val).then(function(drivers) {
        return _.map(drivers, function(driver) {
          return {
            id: driver.id,
            name: $filter('fullName')(driver),
            phone: driver.phone,
            tractorNumber: driver.tractorNumber
          };
        });
      });
    };

    /**
     * Returns text for filter
     * @example Availability 10/15/2015 - 11/12/2015
     */
    this.formatDateText = function() {
      return 'Availability ' + _.join([moment(this.startDate).format('MM/DD/YY'), moment(this.endDate).format('MM/DD/YY')], ' - ');
    };

    /**
     * Clears out filter dates
     * @param {Object} $event - JQuery event
     */
    this.clearDates = function($event) {
      this.startDate = null;
      this.endDate = null;
      $event.stopPropagation();
    };

    /**
     * Calls api to fetch a list of drivers 
     */
    this.getDrivers = function() {
      var that = this;
      that.showLoading = true;
      carrierApi.fetchDrivers(that.carrierId, that.paging).then(function(drivers) {
        that.paging.totalRecords = drivers.totalRecordCount;
        that.paging.recordCount = _.size(drivers.data);
        that.drivers = drivers.data;
      }).finally(function() {
        that.showLoading = false;
      });
    };

    this.newDriverHandler = function() {
      $state.go(this.routesConfig.INDEX.myCompanyDriverProfile.name);
    };

    this.onSelectCallback = function(driver) {
      if (driver) {
        $state.go(this.routesConfig.INDEX.myCompanyDriverProfile.name, {
          driverId: driver.id
        });
      }
    };

    this.$onInit = function() {
      var that = this;
      that.drivers = null;
      that.pagination = null;
      that.showLoading = true;
      that.firstRecord = 0;
      that.startDate = null;
      that.endDate = null;
      that.routesConfig = routesConfig;
      that.paging = new PagingModel(appConstants.LIMIT.driverList);
      that.getDrivers();
    };
  }
});