'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.config.routes'
]).component('appFooter', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(userProfileService, routesConfig) {
      var that = this;
      that.user = userProfileService.getUser();
      that.privacyPolicyRoute = routesConfig.INDEX.privacyPolicy.name;
      that.termsAndConditionsRoute = routesConfig.INDEX.termsAndConditions.name;
  }
});
