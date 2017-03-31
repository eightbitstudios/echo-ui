'use strict';

angular.module('echo.components.echoRepContact', [
  'echo.filters.phoneNumber',
  'echo.filters.fullName'
]).component('echoRepContact', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'echo-rep-contact.component.html'
});