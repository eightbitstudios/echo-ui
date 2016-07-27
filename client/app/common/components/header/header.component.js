'use strict';

angular.module('echo.components.header', [
  'echo.services.user',
  'echo.services.repDetails',
  'echo.api.authentication'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function ($window, routesConfig, repDetailsService, userService, authenticationApi) {
    var that = this;

    that.repDetails = repDetailsService.getRepDetails();
    that.user = userService.getUser();
    that.routesConfig = routesConfig;

    that.signOutHandler = function () {
      authenticationApi.signOut(that.user.id).then(function () {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };
  }
});