'use strict';

angular.module('echo.components.carrierNav', [
  'echo.config.routesConfig'
]).component('carrierNav', {
  templateUrl: 'app/common/components/carrier-nav/carrier-nav.template.html',
  controller: function (routesConfig) {
    this.routesConfig = routesConfig;
  }
});