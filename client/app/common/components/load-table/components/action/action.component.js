angular.module('echo.components.loadTable.action', [
  'echo.filters.firstCharacter',
  'echo.config.appConstants',
  'echo.enums.loadTypes'
])
  .component('action', {
    templateUrl: 'app/common/components/load-table/components/action/action.template.html',
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
