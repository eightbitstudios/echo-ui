'use strict';

angular.module('echo.components.portalUserProfile', [
  'echo.config.routes',
  'echo.services.portalUser'
]).component('portalUserProfile', {
  bindings: {
    portalUser: '=', 
    carrierId: '='
  },
  templateUrl: 'app/common/components/portal-user-profile/portal-user-profile.template.html',
  controller: function ($state, routesConfig, portalUserService) {
    var that = this;

    that.dataSubmitted = false;

    that.saveChangesHandler = function (portalUser) {
      portalUserService.upsertPortalUser(that.carrierId, portalUser).then(function () {
        that.dataSubmitted = true;
      });
    };

    that.invitationButtonHandler = function() {
      $state.go(routesConfig.INDEX.myCarriersDetails.name);
    };
  }
});