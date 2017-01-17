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
    this.errorMessages = {};
     _.assign(this.errorMessages, appConstants.ERROR_MESSAGES.DEFAULTS, this.messageOverride);
  }
});