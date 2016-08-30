'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile'
]).component('appFooter', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(userProfileService) {
    this.user = userProfileService.getUser();
  }
});