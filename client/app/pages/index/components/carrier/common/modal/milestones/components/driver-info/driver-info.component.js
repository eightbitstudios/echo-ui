angular.module('echo.components.modal.milestones.driverInfo', [
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
]).component('driverInfo', {
    templateUrl: 'driver-info.component.html',
    bindings: {
      driver: '<'
    },
    controller: function () {
      this.$onInit = function() {
        this.noDriver = _.isUndefined(this.driver);
      };
    }
  });