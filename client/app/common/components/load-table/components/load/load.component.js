angular.module('echo.components.loadTable.load', [])
  .component('load', {
    templateUrl: 'app/common/components/load-table/components/load/load.component.html',
    bindings: {
      loadNumber: '<',
      proNumber: '<',
      loadGuid: '<',
      isDetailsUpdated: '<'
    },
    controller: function(routesConfig) {
      this.$onInit = function() {
        this.loadDetails = routesConfig.INDEX.loadDetails.name;
      };
    }
  });