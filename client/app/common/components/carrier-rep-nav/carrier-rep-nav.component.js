'use strict';

angular.module('echo.components.carrierRepNav', [
  'echo.config.routesConfig'
]).component('carrierRepNav', {
  templateUrl: 'app/common/components/carrier-rep-nav/carrier-rep-nav.template.html',
  controller: function (routesConfig) {
    this.routesConfig = routesConfig;
  }
});