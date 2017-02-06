'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function($window, store$, routesConfig, authenticationApi) {
    var that = this;

    that.signOutHandler = function() {
      authenticationApi.signOut(that.user.userId).then(function() {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };

    that.$onInit = function() {
      var sub = store$.subscribe(function(state) {
        if (!_.isEmpty(that.user)) {
          that.user = state.user;
          sub.dispose();
        }
      });

      that.routesConfig = routesConfig;
    };
  }
});