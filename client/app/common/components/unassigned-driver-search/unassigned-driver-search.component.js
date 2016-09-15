'use strict';

angular.module('echo.components.unassignedDriverSearch', [
  'echo.api.carrier',
  'echo.filters.fullName',
  'echo.models.driver'
]).component('unassignedDriverSearch', {
  bindings: {
    carrierId: '<',
    driver: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/unassigned-driver-search/unassigned-driver-search.template.html',
  controller: function ($filter, carrierApi, DriverModel) {
    var that = this;
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
            name: $filter('fullName')(driver),
            phone: driver.phone,
            tractorNumber: driver.tractorNumber
          };
        });
      });
    };

    that.setDriver = function (selection) {
      var driverModel = null;
      if (selection) {
        driverModel = new DriverModel(selection);
        driverModel.firstName = _.nth(_.split(selection.name, ' '), 0);
        driverModel.lastName = _.nth(_.split(selection.name, ' '), 1);
      }
      that.driver = driverModel;
    };
  }
});