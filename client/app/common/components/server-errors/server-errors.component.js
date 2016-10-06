'use strict';

angular.module('echo.components.serverErrors', [
  'echo.config.appConstants'
]).component('serverErrors', {
  bindings: {
    error: '<',
    messageOverride: '<'
  },
  templateUrl: 'app/common/components/server-errors/server-errors.template.html',
  controller: function (appConstants) {
    var that = this;

    that.errorMessages = {};
     _.assign(this.errorMessages, appConstants.ERROR_MESSAGES.DEFAULTS, that.messageOverride);
  }
});