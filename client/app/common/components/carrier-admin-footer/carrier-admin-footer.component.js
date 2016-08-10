'use strict';

angular.module('echo.components.carrierAdminFooter', [
  'echo.components.echoRepContact'
]).component('carrierAdminFooter', {
  bindings: {
    repDetails: '='
  },
  templateUrl: 'app/common/components/carrier-admin-footer/carrier-admin-footer.template.html',
  controller: function(){}
});