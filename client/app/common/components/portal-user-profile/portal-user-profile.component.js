'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.models.user',
  'echo.directives.phoneNumberMask'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    userUpdatedHandler: '&',
    showLoading: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserService) {
    var that = this;

    that.mode = {
      PROFILE: 0,
      CONFIRMATION: 1
    };

    that.modeShow = that.mode.PROFILE;

    that.showConfirmation = false;

    that.saveChangesHandler = function (portalUser) {
      that.serverError = null;
      portalUserService.upsertPortalUser(portalUser).then(function () {
        that.modeShow = that.mode.CONFIRMATION;
        if (!that.isNewProfile) {
          that.userUpdatedHandler();
        }
      }).catch(function (message) {
        that.serverError = message;
      });
    };

    that.removeUserHandler = function (portalUser) {
      portalUserService.deactivatePortalUserById(portalUser).then(function () {
        that.userUpdatedHandler();
      }).catch(function (message) {
        that.serverError = message;
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