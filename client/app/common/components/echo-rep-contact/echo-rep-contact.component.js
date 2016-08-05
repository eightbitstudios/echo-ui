
'use strict';

angular.module('echo.components.echoRepContact', [
  'echo.filters.phoneNumber'
]).component('echoRepContact', {
  bindings: {
    repDetails: '='
  },
  templateUrl: 'app/common/components/echo-rep-contact/echo-rep-contact.template.html',
  controller: function(){}
});