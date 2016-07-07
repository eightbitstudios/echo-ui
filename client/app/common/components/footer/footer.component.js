'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.services.user',
  'echo.services.repDetails'
]).component('appFooter', {
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(repDetailsService, userService) {
    this.repDetails = repDetailsService.getRepDetails();
    this.user = userService.getUser();
  }
});