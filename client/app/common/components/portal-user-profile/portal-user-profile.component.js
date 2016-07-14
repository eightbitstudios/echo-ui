'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.services.portalUser',
  'echo.config.appConstants'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '<',
    carrierId: '<',
    userUpdatedHandler: '&',
    showLoading: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserService, appConstants) {
    var that = this;

    that.dataSubmitted = false;
    that.showConfirmation = false;

    that.regex = appConstants.REGEX;

    that.saveChangesHandler = function (portalUser) {
      that.showLoading = true;
      that.serverError = null;
      portalUserService.upsertPortalUser(that.carrierId, portalUser).then(function () {
        that.dataSubmitted = true;
        if(!that.isNewProfile){
          that.userUpdatedHandler();
        }else {
          that.showLoading = false;
        }
      }).catch(function(message){
        that.serverError = message;
        that.showLoading = false;
      });
    };

    that.removeUserHandler = function (portalUser) {
      that.showLoading = true;
      portalUser.active = false;
      portalUserService.updatePortalUserById(that.carrierId, portalUser).then(function () {
        that.userUpdatedHandler();
      }).catch(function(message){
        that.serverError = message;
      });
    };

    that.toggleConfirmation = function() {
      that.serverError = null;
      that.showConfirmation = !that.showConfirmation;
    };

    that.checkIfNewProfile = function(changeObject) {
      if(changeObject.portalUser && changeObject.portalUser.current){
        that.isNewProfile = _.isUndefined(that.portalUser.Id);
      }
    };

    that.$onChanges = that.checkIfNewProfile;
  }
});