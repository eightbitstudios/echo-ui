'use strict';

angular.module('echo.components.carrierAdminNav', [
  'echo.config.routesConfig'
]).component('carrierAdminNav', {
  bindings: {
    carrierDetails: '='
  },
  templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/carrier-admin-nav/carrier-admin-nav.template.html',
  controller: function ($state, routesConfig) {
    this.routesConfig = routesConfig;
    if($state.current.name === routesConfig.INDEX.myCarriers.name){
      $state.go(routesConfig.INDEX.dashboard.name);
    }
  }
});