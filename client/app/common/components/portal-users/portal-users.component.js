'use strict';

angular.module('echo.components.portalUsers', []).component('portalUsers', {
  bindings: {
    portalUsers: '=',
    clickHandler: '&'
  },
  templateUrl: 'app/common/components/portal-users/portal-users.template.html',
  controller: function() { 
    var that = this;

    that.userTileClickHandler = function(portalUser) {
      that.clickHandler({user: portalUser});
    };

    that.addTileHandler = function() {
      that.clickHandler({user: null});
    };
  }
});