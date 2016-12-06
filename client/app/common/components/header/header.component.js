'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication',
  'echo.services.repDetails'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function ($window, repDetailsService, routesConfig, userProfileService, authenticationApi) {
    var that = this;

    that.repDetails = repDetailsService.getRep();
    that.user = userProfileService.getUser();

    that.routesConfig = routesConfig;

    that.signOutHandler = function () {
      authenticationApi.signOut(that.user.userId).then(function () {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };
  }
});