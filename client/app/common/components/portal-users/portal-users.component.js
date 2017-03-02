'use strict';

angular.module('echo.components.portalUsers', [
  'echo.filters.phoneNumber',
]).component('portalUsers', {
  bindings: {
    portalUsers: '=',
    clickHandler: '&'
  },
  templateUrl: 'app/common/components/portal-users/portal-users.component.html',
  controller: function() { 

    this.userTileClickHandler = function(portalUser) {
      this.clickHandler({user: portalUser});
    };

    this.addTileHandler = function() {
      this.clickHandler({user: null});
    };
  }
});