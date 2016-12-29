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
  controller: function (appConstants, routesConfig, portalUserApi) {
    var that = this;

    that.mode = {
      PROFILE: 0,
      SENT: 1
    };

    that.modeShow = that.mode.PROFILE;

    that.showConfirmation = false;
    that.showButtonLoading = false;

    that.errorMessageOverride = appConstants.ERROR_MESSAGES.PORTAL_USER;

    // Strip international code for frontend
    if (that.portalUser.phone && that.portalUser.phone.charAt(0) === '1') {
      that.portalUser.phone = that.portalUser.phone.slice(1);
    }

    that.saveChangesHandler = function (portalUser) {
      that.serverError = null;
      that.showButtonLoading = true;
      if (!!that.carrierId) {
        portalUser.carrierId = that.carrierId;
      }

      portalUserApi.upsertPortalUser(portalUser).then(function () {
        that.modeShow = that.mode.SENT;
        if (!that.isNewProfile) {
          that.userUpdatedHandler();
        }
      }).catch(function (message) {
        that.serverError = message;
      }).finally(function(){
        that.showButtonLoading = false;
      });
    };

    that.removeUserHandler = function (portalUser) {
      that.showButtonLoading = true;
      portalUserApi.deactivatePortalUserById(portalUser).then(function () {
        that.userUpdatedHandler();
      }).catch(function (message) {
        that.serverError = message;
      }).finally(function(){
        that.showButtonLoading = false;
      });
    };

    that.toggleConfirmation = function () {
      that.serverError = null;
      that.showConfirmation = !that.showConfirmation;
    };

    that.checkIfNewProfile = function (changeObject) {
      if (changeObject.portalUser && changeObject.portalUser.currentValue) {
        that.isNewProfile = _.isUndefined(that.portalUser.id);
      }
    };

    that.$onChanges = that.checkIfNewProfile;
  }
});
