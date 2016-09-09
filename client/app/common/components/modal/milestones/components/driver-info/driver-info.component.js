angular.module('echo.components.modal.milestones.driverInfo', [
  'echo.filters.firstCharacter',
  'echo.filters.phoneNumber',
]).component('driverInfo', {
    templateUrl: 'app/common/components/modal/milestones/components/driver-info/driver-info.template.html',
    bindings: {
      driver: '<'
    },
    controller: function () {
    }
  });