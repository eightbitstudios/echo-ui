angular.module('echo.components.modal.assignDriver.assignedDriverProfile', [
    'echo.filters.phoneNumber',
    'echo.config.routes',
    'echo.filters.fullName'
  ])
  .component('assignedDriverProfile', {
    templateUrl: 'assigned-driver-profile.component.html',
    bindings: {
      assignedDriver: '<',
      changeDriverCallback: '&'
    },
    controller: function(routesConfig) {
      this.$onInit = function() {
        this.viewAllDrivers = routesConfig.INDEX.myCompanyDrivers.name;
        this.myCompanyDriverProfile = routesConfig.INDEX.myCompanyDriverProfile.name;
      };
    }
  });