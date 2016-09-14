'use strict';

angular.module('echo.components.unassignedDriverSearch', [
  'echo.api.carrier',
  'echo.filters.fullName'
]).component('unassignedDriverSearch', {
  bindings: {
    carrierId: '<',
    driver: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/unassigned-driver-search/unassigned-driver-search.template.html',
  controller: function ($filter, carrierApi) {
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
      that.driver = selection;
    };
  }
});