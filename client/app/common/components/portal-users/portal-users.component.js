'use strict';

angular.module('echo.components.portalUsers', []).component('portalUsers', {
  bindings: {
    portalUsers: '=',
    userRoute: '='
  },
  templateUrl: 'app/common/components/portal-users/portal-users.template.html',
  controller: function($state) { 
    var that = this;

    that.userTileClickHandler = function(portalUser) {
      $state.go(that.userRoute.name, {userId: portalUser.userId});
    };

    that.addTileHandler = function() {
      $state.go(that.userRoute.name);
    };
  }
});