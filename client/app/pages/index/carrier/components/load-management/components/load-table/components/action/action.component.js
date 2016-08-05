angular.module('echo.index.carrier.loadManagement.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.filters.reportDate'
])
  .component('action', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-table/components/action/action.template.html',
    bindings: {
      action: '<'
    },
    controller: function (appConstants) {
      this.appConstants = appConstants;
    }
  });
