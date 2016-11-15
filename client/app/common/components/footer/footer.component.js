'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.config.routes',
  'echo.config.appConstants'
]).component('appFooter', {
  bindings: {
    repDetails: '<'
  },
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(userProfileService, routesConfig, appConstants, $window) {
      var that = this;
      that.user = userProfileService.getUser();
      that.termsAndConditionsRoute = routesConfig.INDEX.termsAndConditions.name;

      that.privacyPolicyHandler = function () {
        $window.open(appConstants.PRIVACY_POLICY_URL, '_blank');
      };
  }
});
