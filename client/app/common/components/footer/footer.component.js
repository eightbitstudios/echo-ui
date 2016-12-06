'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.services.repDetails',
  'echo.config.routes',
  'echo.config.appConstants'
]).component('appFooter', {
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(repDetailsService, userProfileService, routesConfig, appConstants) {
      var that = this;
      
      that.user = userProfileService.getUser();
      that.repDetails = repDetailsService.getRep();

      that.termsAndConditionsRoute = routesConfig.INDEX.termsAndConditions.name;
      that.privacyPolicyRoute = appConstants.PRIVACY_POLICY_URL;
  }
});
