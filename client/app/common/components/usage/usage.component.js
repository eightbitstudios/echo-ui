'use strict';

angular.module('echo.components.usage', [
  'echo.components.resendInvite',
  'echo.models.user',
  'echo.models.driver'
]).component('usage', {
  bindings: {
    user: '<'
  },
  templateUrl: 'app/common/components/usage/usage.template.html',
  controller: function (UserModel, DriverModel) {
    var that = this;

    that.hasUserLoggedIn = function () {
      return that.user.lastLogin !== 'Never';
    };

    that.isPortalUser = function () {
      return that.user instanceof UserModel;
    };

    that.isDriver = function () {
      return that.user instanceof DriverModel;
    };
  }
});
