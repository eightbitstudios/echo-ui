angular.module('echo.components.loadTable.load', [])
  .component('load', {
    templateUrl: 'load.component.html',
    bindings: {
      loadNumber: '<',
      proNumber: '<',
      loadGuid: '<',
      isDetailsUpdated: '<'
    },
    controller: function($state, routesConfig) {
      var that = this;
      that.$onInit = function() {
        that.loadDetails = routesConfig.INDEX.loadDetails.name;
        that.currentStateName = $state.$current.name;
      };
    }
  });