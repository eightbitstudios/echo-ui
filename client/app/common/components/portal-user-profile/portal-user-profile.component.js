'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.appConstants',
  'echo.config.routes',
  'echo.models.user',
  'echo.components.loadingButton',
  'echo.api.portalUser',
  'echo.components.serverErrors',
  'echo.directives.focus'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    userUpdatedHandler: '&',
    showLoading: '=',
    isCarrierAdmin: '<',
    carrierId: '<'
  },
  transclude: {
    'go-back-button': 'goBackButton',
    'success-button': 'successButton'
  },
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function(appConstants, routesConfig, portalUserApi) {

    this.saveChangesHandler = function(portalUser) {
      var that = this;

      that.serverError = null;
      that.showButtonLoading = true;
      if (!!that.carrierId) {
        portalUser.carrierId = that.carrierId;
      }

      portalUserApi.upsertPortalUser(portalUser).then(function() {
        that.modeShow = that.mode.SENT;
        if (!that.isNewProfile) {
          that.userUpdatedHandler();
        }
      }).catch(function(message) {
        that.serverError = message;
      }).finally(function() {
        that.showButtonLoading = false;
      });
    };

    this.removeUserHandler = function(portalUser) {
      var that = this;

      that.showButtonLoading = true;
      portalUserApi.deactivatePortalUserById(portalUser).then(function() {
        that.userUpdatedHandler();
      }).catch(function(message) {
        that.serverError = message;
      }).finally(function() {
        that.showButtonLoading = false;
      });
    };

    this.toggleConfirmation = function() {
      this.serverError = null;
      this.showConfirmation = !this.showConfirmation;
    };

    this.checkIfNewProfile = function(changeObject) {
      if (changeObject.portalUser && changeObject.portalUser.currentValue) {
        this.isNewProfile = _.isUndefined(this.portalUser.id);
      }
    };

    this.$onChanges = this.checkIfNewProfile;

    this.$onInit = function() {
      this.mode = {
        PROFILE: 0,
        SENT: 1
      };

      this.modeShow = this.mode.PROFILE;
      this.showConfirmation = false;
      this.showButtonLoading = false;
      this.errorMessageOverride = appConstants.ERROR_MESSAGES.PORTAL_USER;
      this.emailValidation = appConstants.REGEX.emailValidation;

      // Strip international code for frontend
      if (this.portalUser.phone && this.portalUser.phone.charAt(0) === '1') {
        this.portalUser.phone = this.portalUser.phone.slice(1);
      }
    };
  }
});