angular.module('echo.index.myCarriers.carrierAdmin.myCompany.userProfile', [
  'echo.services.portalUser',
  'echo.components.portalUsers',
  'echo.components.tabBar',
  'echo.components.resendInvite',
  'echo.components.loading',
  'echo.config.routes'
])
  .component('myCompanyUserProfile', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-user-profile/my-company-user-profile.template.html',
    bindings: {
      portalUser: '<',
      doneHandler: '&'
    },
    controller: function () {
      var that = this;
      that.userProfileCompleted = function() {
        that.doneHandler();
      };
    }
  });
