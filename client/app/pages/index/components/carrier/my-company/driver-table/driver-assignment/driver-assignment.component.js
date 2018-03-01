'use strict';

angular.module('echo.index.carrier.myCompany.driverTable.driverAssignment', [
  'echo.config.routes'
]).component('driverAssignment', {
  bindings: {
    assignment: '<',
    driver: '<'
  },
  templateUrl: 'driver-assignment.component.html',
  controller: function(routesConfig) {
    this.$onInit = function() {
      this.loadDetails = routesConfig.INDEX.loadDetails.name;
    };
  }
});