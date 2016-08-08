'use strict';

angular.module('echo.components.serverErrors', [
  'echo.config.appConstants'
]).component('serverErrors', {
  bindings: {
    error: '<',
  },
  templateUrl: 'app/common/components/server-errors/server-errors.template.html',
  controller: function (appConstants) {
    this.errorMessages = appConstants.ERROR_MESSAGES;
  }
});