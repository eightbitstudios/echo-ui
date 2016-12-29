angular.module('echo.components.modal.assignDriver.assignedDriverProfile', [
  'echo.filters.phoneNumber',
  'echo.config.routes',
  'echo.filters.fullName'
])
  .component('assignedDriverProfile', {
    templateUrl: 'app/common/components/modal/assign-driver-modal/components/assigned-driver-profile/assigned-driver-profile.template.html',
    bindings: {
      assignedDriver: '<',
      changeDriverCallback: '&'
    },
    controller: function (routesConfig) {
      this.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;
      this.myCompanyDriverProfile = routesConfig.INDEX.myCompanyDriverProfile.name;
    }
  });
