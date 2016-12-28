'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.services.repDetails',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.services.modal',
  'echo.components.termsAndConditions'
]).component('appFooter', {
  templateUrl: 'app/common/components/footer/footer.template.html',
    controller: function(repDetailsService, userProfileService, routesConfig, appConstants, modalService) {
      var that = this;

      that.user = userProfileService.getUser();
      that.repDetails = repDetailsService.getRep();

      that.privacyPolicyRoute = appConstants.PRIVACY_POLICY_URL;

      that.showTermsAndConditionsModal = function () {
        var modalInstance = modalService.open({
          component: 'terms-and-conditions'
        }).result;

        modalInstance.then(function () {});
      };
  }
});
