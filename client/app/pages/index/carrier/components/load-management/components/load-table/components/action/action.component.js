angular.module('echo.index.carrier.loadManagement.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.enums.loadTypes'
])
  .component('action', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-table/components/action/action.template.html',
    bindings: {
      action: '<',
      loadType: '<'
    },
    controller: function (appConstants, loadTypesEnum) {
      var that = this;

      that.appConstants = appConstants;
      that.loadTypesEnum = loadTypesEnum;
    }
  });
