'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.models.user',
  'echo.directives.phoneNumberMask',
  'echo.components.loadingButton',
  'echo.api.portalUser'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    userUpdatedHandler: '&',
    showLoading: '=',
    isCarrierAdmin: '<'
  },
  transclude: true,
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserApi) {
    var that = this;

    that.mode = {
      PROFILE: 0,
      SENT: 1
    };

    that.modeShow = that.mode.PROFILE;

    that.showConfirmation = false;
    that.showButtonLoading = false;

    that.saveChangesHandler = function (portalUser) {
      that.serverError = null;
      that.showButtonLoading = true;
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