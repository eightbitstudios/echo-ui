'use strict';

angular.module('echo.components.stopContact', [
  'echo.filters.phoneNumber'
]).component('stopContact', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'stop-contact.component.html'
});