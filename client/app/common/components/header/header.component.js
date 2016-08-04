'use strict';

angular.module('echo.components.header', [
  'echo.services.user',
  'echo.api.authentication'
]).component('appHeader', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function ($window, routesConfig, userService, authenticationApi) {
    var that = this;

    that.user = userService.getUser();
    that.routesConfig = routesConfig;

    that.signOutHandler = function () {
      authenticationApi.signOut(that.user.id).then(function () {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };
  }
});