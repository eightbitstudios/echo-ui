'use strict';

angular.module('echo.components.repAdminNav', [
  'echo.config.routesConfig'
]).component('repAdminNav', {
  templateUrl: 'app/common/components/rep-admin-nav/rep-admin-nav.template.html',
  controller: function (routesConfig) {
    this.routesConfig = routesConfig;
  }
});