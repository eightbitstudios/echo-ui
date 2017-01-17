'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.services.repDetails',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.services.modal',
  'echo.components.modal.termsAndConditions'
]).component('appFooter', {
  templateUrl: 'app/common/components/footer/footer.template.html',
  controller: function(repDetailsService, userProfileService, routesConfig, appConstants, modalService) {
    this.showTermsAndConditionsModal = function() {
      var modalInstance = modalService.open({
        component: 'terms-and-conditions',
        bindings: {
          acceptFooter: false
        }
      }).result;

      modalInstance.then(function() {});
    };

    this.$onInit = function() {
      this.user = userProfileService.getUser();
      this.repDetails = repDetailsService.getRep();
      this.privacyPolicyRoute = appConstants.PRIVACY_POLICY_URL;
    };
  }
});