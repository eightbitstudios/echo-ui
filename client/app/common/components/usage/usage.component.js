'use strict';

angular.module('echo.components.usage', [
  'echo.components.resendInvite'
]).component('usage', {
  bindings: {
    user: '<',
    isPortalUser: '<',
    isDriver: '<'
  },
  templateUrl: 'app/common/components/usage/usage.template.html',
  controller: function () {
    var that = this;

    that.hasUserLoggedIn = function () {
      return that.user.lastLogin !== 'Never';
    };
  }
});
