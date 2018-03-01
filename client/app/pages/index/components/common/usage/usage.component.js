'use strict';

angular.module('echo.components.usage', [
  'echo.components.resendInvite',
  'echo.models.user',
  'echo.models.driver'
]).component('usage', {
  bindings: {
    user: '<'
  },
  templateUrl: 'usage.component.html',
  controller: function (UserModel, DriverModel) {
    this.hasUserLoggedIn = function () {
      return this.user.lastLogin !== 'Never';
    };

    this.isPortalUser = function () {
      return this.user instanceof UserModel;
    };

    this.isDriver = function () {
      return this.user instanceof DriverModel;
    };
  }
});
