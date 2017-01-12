
'use strict';

angular.module('echo.components.echoRepContact', [
  'echo.filters.phoneNumber',
  'echo.filters.fullName'
]).component('echoRepContact', {
  bindings: {
    repDetails: '='
  },
  templateUrl: 'app/common/components/echo-rep-contact/echo-rep-contact.template.html'
});