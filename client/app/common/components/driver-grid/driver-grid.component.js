'use strict';

angular.module('echo.components.driverGrid', [
  'echo.components.typeaheadSearch',
  'echo.components.loading',
  'echo.config.routes',
  'echo.components.pagination',
  'echo.filters.phoneNumber',
  'echo.directives.dateRangePicker',
  'echo.models.paging',
  'echo.config.appConstants',
  'echo.api.carrier',
  'echo.filters.fullName'
]).component('driverGrid', {
  bindings: {
    carrierId: '<'
  },
  templateUrl: 'app/common/components/driver-grid/driver-grid.template.html',
  controller: function ($state, $filter, routesConfig, carrierApi, PagingModel, appConstants) {
    var that = this;
    that.drivers = null;
    that.pagination = null;
    that.showLoading = true;
    that.firstRecord = 0;
    that.startDate = null;
    that.endDate = null;
    that.routesConfig = routesConfig;
    that.paging = new PagingModel(appConstants.LIMIT.driverList);

    /**
     * Call api to search for drivers
     * @param {string} val - Search text
     * @retuns {Promise} - List of drivers formatted for typeahead search
     */
    that.searchDrivers = function (val) {
      return carrierApi.searchDrivers(that.carrierId, val).then(function (drivers) {
        return _.map(drivers, function (driver) {
          return {
            id: driver.id,
            name: $filter('fullName')(driver)
          };
        });
      });
    };

    /**
     * Returns text for filter
     * @example Availability 10/15/2015 - 11/12/2015
     */
    that.formatDateText = function () {
      return 'Availability ' + _.join([moment(that.startDate).format('MM/DD/YY'), moment(that.endDate).format('MM/DD/YY')], ' - ');
    };

    /**
     * Clears out filter dates
     * @param {Object} $event - JQuery event
     */
    that.clearDates = function ($event) {
      that.startDate = null;
      that.endDate = null;
      $event.stopPropagation();
    };

    /**
     * Calls api to fetch a list of drivers 
     */
    that.getDrivers = function () {
      that.showLoading = true;
      carrierApi.fetchDrivers(that.carrierId, that.paging).then(function (drivers) {
        that.paging.totalRecords = drivers.totalRecordCount;
        that.paging.recordCount = _.size(drivers.data);
        that.drivers = drivers.data;
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.newDriverHandler = function () {
      $state.go(that.routesConfig.INDEX.myCompanyDriverProfile.name);
    };

    that.onSelectCallback = function (driver) {
      $state.go(that.routesConfig.INDEX.myCompanyDriverProfile.name, { driverId: driver.id });
    };

    that.$onInit = that.getDrivers;
  }
});