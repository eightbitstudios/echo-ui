'use strict';

angular.module('echo.components.footer', [
  'echo.components.billingQuestions',
  'echo.components.carrierAdminFooter',
  'echo.services.userProfile',
  'echo.config.routes',
  'echo.config.appConstants',
  'echo.services.modal',
  'echo.components.modal.termsAndConditions'
]).component('appFooter', {
  templateUrl: 'app/common/components/footer/footer.component.html',
  controller: function(store$, routesConfig, appConstants, modalService) {
    var that = this;
    var sub = null;

    that.showTermsAndConditionsModal = function() {
      modalService.open({
        component: 'terms-and-conditions',
        bindings: {
          acceptFooter: false
        }
      });
    };

    that.$onInit = function() {
      sub = store$.subscribe(function(state) {
        that.repDetails = state.rep;
        that.user = state.user;
      });

      that.privacyPolicyRoute = appConstants.PRIVACY_POLICY_URL;
    };

    that.$onDestroy = function() {
      sub.dispose();
    };
  }
});