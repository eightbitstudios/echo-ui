'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.services.portalUser',
  'echo.config.appConstants'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    carrierId: '<',
    invitationSentHandler: '&'
  },
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserService, appConstants) {
    var that = this;

    that.dataSubmitted = false;
    that.showConfirmation = false;

    that.regex = appConstants.REGEX;

    that.saveChangesHandler = function (portalUser) {
      that.serverError = null;
      portalUserService.upsertPortalUser(that.carrierId, portalUser).then(function (thing) {
        console.log(thing);
        that.dataSubmitted = true;
      }).catch(function(message){
        that.serverError = message;
      });
    };

    that.removeUserHandler = function (portalUser) {
      portalUser.active = false;
      portalUserService.updatePortalUserById(that.carrierId, portalUser).then(function () {
        that.invitationSentHandler();
      }).catch(function(message){
        that.serverError = message;
      });
    };

    that.invitationButtonHandler = function () {
      that.invitationSentHandler();
    };

    that.toggleConfirmation = function() {
      that.serverError = null;
      that.showConfirmation = !that.showConfirmation;
    };
  }
});