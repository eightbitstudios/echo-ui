angular.module('echo.components.modal.assignDriver.unassignedDriver', [
  'echo.components.typeaheadSearch',
  'echo.api.carrier',
  'echo.components.modal.assignDriver.selectedDriver',
  'echo.components.modal.assignDriver.unassignedDriverList',
  'echo.config.routes',
  'echo.filters.fullName'
])
  .component('unassignedDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/unassigned-driver/unassigned-driver.template.html',
    bindings: {
      carrierId: '<',
      loadId: '<',
      inviteNewDriverCallback: '&',
      selectedDriverCallback: '&',
      newDriver: '='
    },
    controller: function ($filter, carrierApi, routesConfig) {
      var that = this;
      that.states = {
        driverList: 1,
        selectedDriver: 2,
      };

      that.state = that.states.driverList;
      that.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;

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
              phone: driver.phone
            };
          });
        });
      };

      that.removeDriverCallback = function () {
        that.selectedDriver = null;
        that.selectedDriverCallback({ driver: that.selectedDriver });
        that.state = that.states.driverList;
      };

      that.onSelectCallback = function (driver) {
        that.selectedDriver = driver;
        that.selectedDriverCallback({ driver: that.selectedDriver });
        that.state = that.states.selectedDriver;
      };

      that.$onInit = function () {
        if (!_.isUndefined(_.get(that.newDriver, 'id'))) {
          that.selectedDriver = that.newDriver;
          that.state = that.states.selectedDriver;
        }
      };
    }
  });