angular.module('echo.components.modal.milestones.pickupAtYard', [
    'echo.components.dateTimePicker',
    'echo.components.typeaheadSearch',
    'echo.components.modal.assignDriver.newDriver',
    'echo.components.modal.assignDriver.selectedDriver',
    'echo.api.loads'
  ])
  .component('pickupAtYard', {
    templateUrl: 'app/common/components/modal/milestones/components/pickup-at-yard/pickup-at-yard.template.html',
    bindings: {
      load: '<',
      carrierId: '<',
      timeZones: '<',
      assignedDriver: '=',
      dateTimePicker: '='
    },
    controller: function($filter, carrierApi) {

      this.showFindDriver = function() {
        this.currentState = this.modes.findDriver;
      };

      this.showInviteNewDriver = function() {
        this.currentState = this.modes.inviteNewDriver;
      };

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

      this.invitedNewDriver = function(driver) {
        this.setDriver(driver);
        this.showFindDriver();
      };

      this.setDriver = function(selection) {
        this.assignedDriver = selection;
      };

      this.$onInit = function() {
        this.modes = {
          findDriver: 1,
          inviteNewDriver: 2
        };

        this.showFindDriver();
      };
    }
  });