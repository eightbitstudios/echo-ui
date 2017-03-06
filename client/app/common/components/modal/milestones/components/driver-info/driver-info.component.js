angular.module('echo.components.modal.milestones.driverInfo', [
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
]).component('driverInfo', {
    templateUrl: 'app/common/components/modal/milestones/components/driver-info/driver-info.component.html',
    bindings: {
      driver: '<'
    },
    controller: function () {
      this.$onInit = function() {
        this.noDriver = _.isUndefined(this.driver);
      };
    }
  });