'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication'
]).component('appHeader', {
  templateUrl: 'header.component.html',
  controller: function($window, store$, routesConfig, authenticationApi) {
    var that = this;

    that.signOutHandler = function() {
      authenticationApi.signOut(that.user.userId).then(function() {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };

    that.$onInit = function() {
      store$.subscribe(function(state) {
        if (!_.isEmpty(state.user)) {
          that.user = state.user;
        }
      });

      that.routesConfig = routesConfig;
    };
  }
});