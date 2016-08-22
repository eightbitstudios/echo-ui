angular.module('echo.components.modal.assignDriver.unassignedDriver', [
  'echo.components.typeaheadSearch',
  'echo.api.carrier',
  'echo.components.modal.assignDriver.selectedDriver'
])
  .component('unassignedDriver', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/unassigned-driver/unassigned-driver.template.html',
    bindings: {
      carrierId: '<',
      inviteNewDriverCallback: '&',
      selectedDriverCallback: '&'
    },
    controller: function (carrierApi) {
      var that = this;
      that.states = {
        driverList: 0,
        selectedDriver: 1,
      };

      that.state = that.states.driverList;

      /**
       * Call api to search for drivers
       * @param {string} val - Search text
       * @retuns {Promise} - List of drivers formatted for typeahead search
       */
      that.searchDrivers = function (val) {
        return carrierApi.searchDrivers(2, val).then(function (drivers) {
          return _.map(drivers, function (driver) {
            return {
              id: driver.id,
              name: driver.getFullName(),
              phone: driver.phone
            };
          });
        });
      };

      that.removeDriverCallback = function (){
        that.selectedDriver = null;
        that.selectedDriverCallback({driver: that.selectedDriver});
        that.state = that.states.driverList;
      };

      that.onSelectCallback = function (driver) {
        that.selectedDriver = driver;
        that.selectedDriverCallback({driver: that.selectedDriver});
        that.state = that.states.selectedDriver;
      };
    }
  });