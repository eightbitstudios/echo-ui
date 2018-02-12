'use strict';

angular.module('echo.index.carrier.carrierAdminNav', [
  'echo.config.routes'
]).component('carrierAdminNav', {
  bindings: {
    carrierDetails: '='
  },
  templateUrl: 'carrier-admin-nav.component.html',
  controller: function($state, routesConfig) {
    this.$onInit = function() {
      this.routesConfig = routesConfig;
      this.state = $state;
      if ($state.current.name === routesConfig.INDEX.myCarriers.name) {
        $state.go(routesConfig.INDEX.dashboard.name);
      }
    };
  }
});