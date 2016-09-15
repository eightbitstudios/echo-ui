'use strict';

angular.module('echo.index.carrier.carrierAdminNav', [
  'echo.config.routes'
]).component('carrierAdminNav', {
  bindings: {
    carrierDetails: '='
  },
  templateUrl: 'app/pages/index/carrier/components/carrier-admin-nav/carrier-admin-nav.template.html',
  controller: function ($state, routesConfig) {
    var that = this;

    that.routesConfig = routesConfig;
    that.state = $state;
    if($state.current.name === routesConfig.INDEX.myCarriers.name){
      $state.go(routesConfig.INDEX.dashboard.name);
    }
  }
});