angular.module('echo.components.modal.assignDriver.assignedDriverProfile', [
  'echo.filters.phoneNumber',
  'echo.config.routes'
])
  .component('assignedDriverProfile', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/assigned-driver-profile/assigned-driver-profile.template.html',
    bindings: {
      assignedDriver: '<',
      changeDriverCallback: '&'
    },
    controller: function (routesConfig) {
      this.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;
    }
  });