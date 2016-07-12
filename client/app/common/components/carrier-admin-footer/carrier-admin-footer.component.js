'use strict';

angular.module('echo.components.carrierAdminFooter', [
  'echo.config.routes'
]).component('carrierAdminFooter', {
  bindings: {
    repDetails: '='
  },
  templateUrl: 'app/common/components/carrier-admin-footer/carrier-admin-footer.template.html',
  controller: function(){}
});