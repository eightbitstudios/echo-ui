angular.module('echo.components.loadTable.load', [])
  .component('load', {
    templateUrl: 'app/common/components/load-table/components/load/load.component.html',
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