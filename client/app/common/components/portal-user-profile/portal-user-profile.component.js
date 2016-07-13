'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.services.portalUser'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    carrierId: '<',
    invitationSentHandler: '&'
  },
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserService) {
    var that = this;

    that.dataSubmitted = false;
    that.showConfirmation = false;

    that.saveChangesHandler = function (portalUser) {
      portalUserService.upsertPortalUser(that.carrierId, portalUser).then(function () {
        that.dataSubmitted = true;
      });
    };

    that.removeUserHandler = function (portalUser) {
      portalUser.active = false;
      portalUserService.updatePortalUserById(that.carrierId, portalUser).then(function () {
        that.invitationSentHandler();
      });
    };

    that.invitationButtonHandler = function () {
      that.invitationSentHandler();
    };

    that.toggleConfirmation = function() {
      that.showConfirmation = !that.showConfirmation;
    };
  }
});