'use strict';

angular.module('echo.components.header', [
  'echo.services.user',
  'echo.services.repDetails'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function(routesConfig, repDetailsService, userService) {
    this.repDetails = repDetailsService.getRepDetails();
    this.user = userService.getUser();
    this.routesConfig = routesConfig;
  }
});