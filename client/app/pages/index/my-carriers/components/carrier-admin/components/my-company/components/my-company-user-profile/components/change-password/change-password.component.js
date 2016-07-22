angular.module('echo.index.myCarriers.carrierAdmin.myCompany.userProfile.changePassword', [
  'echo.components.passwordValidation',
  'echo.config.routes',
  'echo.models.passwordChange'
])
  .component('changePassword', {
    templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/components/my-company/components/my-company-user-profile/components/change-password/change-password.template.html',
    bindings: {
      userId: '<'
    },
    controller: function (PasswordChangeModel) {
      var that = this;

      that.passwordChange = new PasswordChangeModel();
      that.currentPassword = null;
      that.showLoadingButton = false;


      that.changePasswordHandler = function() {

      };

    }
  });
