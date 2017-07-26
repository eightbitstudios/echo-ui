'use strict';

angular.module('echo.components.serverErrors', [
  'echo.config.appConstants'
]).component('serverErrors', {
  bindings: {
    error: '<',
    messageOverride: '<'
  },
  templateUrl: 'server-errors.component.html',
  controller: function (appConstants) {
    this.errorMessages = {};
     _.assign(this.errorMessages, appConstants.ERROR_MESSAGES.DEFAULTS, this.messageOverride);
  }
});