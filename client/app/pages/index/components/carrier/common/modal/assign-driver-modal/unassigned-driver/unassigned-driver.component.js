angular.module('echo.components.modal.assignDriver.unassignedDriver', [
    'echo.components.typeaheadSearch',
    'echo.api.carrier',
    'echo.components.modal.assignDriver.selectedDriver',
    'echo.components.modal.assignDriver.unassignedDriverList',
    'echo.config.routes',
    'echo.filters.fullName'
  ])
  .component('unassignedDriver', {
    templateUrl: 'unassigned-driver.component.html',
    bindings: {
      carrierId: '<',
      loadId: '<',
      inviteNewDriverCallback: '&',
      selectedDriverCallback: '&',
      newDriver: '=',
      submitControl: '='
    },
    controller: function($filter, carrierApi, routesConfig) {

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
              phone: driver.phone
            };
          });
        });
      };

      this.removeDriverCallback = function() {
        this.selectedDriver = null;
        this.selectedDriverCallback({
          driver: this.selectedDriver
        });
        this.state = this.states.driverList;
        this.submitControl = true;
      };

      this.onSelectCallback = function(driver) {
        if (driver) {
          this.selectedDriver = driver;
          this.selectedDriverCallback({
            driver: this.selectedDriver
          });
          this.state = this.states.selectedDriver;
        }
      };

      this.$onInit = function() {
        this.states = {
          driverList: 1,
          selectedDriver: 2,
        };

        this.state = this.states.driverList;
        this.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;

        if (!_.isUndefined(_.get(this.newDriver, 'id'))) {
          this.selectedDriver = this.newDriver;
          this.state = this.states.selectedDriver;
        }
      };
    }
  });