'use strict';

angular.module('echo.components.header', [
  'echo.services.userProfile',
  'echo.api.authentication'
]).component('appHeader', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/header/header.template.html',
  controller: function ($window, routesConfig, userProfileService, authenticationApi) {
    var that = this;

    that.user = userProfileService.getUser();
    that.routesConfig = routesConfig;

    that.signOutHandler = function () {
      authenticationApi.signOut(that.user.userId).then(function () {
        $window.location = routesConfig.LOGIN.base.route;
      });
    };
  }
});