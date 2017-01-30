'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function($window, store$, routesConfig, authenticationApi) {
    this.signOutHandler = function() {
      authenticationApi.signOut(this.user.userId).then(function() {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };

    this.$onInit = function() {

      var that = this;
      
      store$.subscribe(function(state) {
        that.user = state.user;
      });
      
      this.routesConfig = routesConfig;
    };
  }
});