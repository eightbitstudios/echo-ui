'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication',
  'echo.services.repDetails'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function($window, repDetailsService, routesConfig, userProfileService, authenticationApi) {
    this.signOutHandler = function() {
      authenticationApi.signOut(this.user.userId).then(function() {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };

    this.$onInit = function() {
      this.repDetails = repDetailsService.getRep();
      this.user = userProfileService.getUser();
      this.routesConfig = routesConfig;
    };
  }
});