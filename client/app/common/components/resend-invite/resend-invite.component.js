'use strict';

angular.module('echo.components.resendInvite', [
  'echo.api.portalUser',
  'echo.components.loadingButton',
  'echo.components.modal.errorMessages'
]).component('resendInvite', {
  bindings: {
    user: '<'
  },
  templateUrl: 'app/common/components/resend-invite/resend-invite.template.html',
  controller: function (portalUserApi) {
    var that = this;

    that.hasUserLoggedIn = function () {
      return that.user.lastLogin !== 'Never';
    };

    that.resendInvite = function () {
      that.showError = false;
      that.showDefaultError = false;
      that.errorCode = null;
      that.showLoading = true;
      portalUserApi.resendInviteToPortalUserById(that.user.id).then(function (inviteData) {
        that.user.invitationStatus = inviteData.invitationStatus;
        that.disableSubmit = true;
        that.showSuccess = true;
      }).catch(function (errorCode) {
        that.errorCode = errorCode;
        that.showError = true;
        if (errorCode === 404112) {
          that.disableSubmit = true;
        } else {
          that.showDefaultError = true;
        }
      }).finally(function () {
        that.showLoading = false;
      });
    };

    that.$onInit = function () {
      that.showLoading = false;
      that.disableSubmit = false;
      that.showError = false;
      that.showDefaultError = false;
      that.showSuccess = false;
    };
  }
});
