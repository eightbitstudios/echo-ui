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
    controller: function ($filter, carrierApi) {
      var that = this;
      that.modes = {
        findDriver: 1,
        inviteNewDriver: 2
      };

      that.assignedDriver = null;

      that.showFindDriver = function () {
        that.currentState = that.modes.findDriver;
      };

      that.showInviteNewDriver = function () {
        that.currentState = that.modes.inviteNewDriver;
      };

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

      that.invitedNewDriver = function(driver) {
        that.setDriver(driver);
        that.showFindDriver();
      };

      that.setDriver = function (selection) {
        that.assignedDriver = selection;
      };

      that.$onInit = function () {
        that.showFindDriver();
      };
    }
  });