'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function($window, store$, routesConfig, authenticationApi) {
    var that = this;
    var sub = null;

    that.signOutHandler = function() {
      authenticationApi.signOut(that.user.userId).then(function() {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };

    that.$onInit = function() {
      sub = store$.subscribe(function(state) {
        that.user = state.user;
      });

      that.routesConfig = routesConfig;
    };

    that.$onDestroy = function() {
      sub.dispose();
    };
  }
});