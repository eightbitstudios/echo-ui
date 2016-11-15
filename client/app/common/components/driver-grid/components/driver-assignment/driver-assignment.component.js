'use strict';

angular.module('echo.components.driverGrid.driverAssignment', [
  'echo.config.routes'
]).component('driverAssignment', {
  bindings: {
    assignment: '<',
    driver: '<'
  },
  templateUrl: 'app/common/components/driver-grid/components/driver-assignment/driver-assignment.template.html',
  controller: function(routesConfig) {
    this.loadDetails = routesConfig.INDEX.loadDetails.name;
  }
});