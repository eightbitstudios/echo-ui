'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.user'
]).component('appFooter', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(userService) {
    this.user = userService.getUser();
  }
});