'use strict';

angular.module('echo.components.resendInvite', [
  'echo.api.portalUser',
  'echo.components.loadingButton',
  'echo.components.modal.errorMessages'
]).component('resendInvite', {
  bindings: {
    user: '<'
  },
  templateUrl: 'app/common/components/resend-invite/resend-invite.component.html',
  controller: function (portalUserApi) {
    this.resendInvite = function () {
      var that = this;
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

    this.$onInit = function () {
      this.showLoading = false;
      this.disableSubmit = false;
      this.showError = false;
      this.showDefaultError = false;
      this.showSuccess = false;
    };
  }
});
