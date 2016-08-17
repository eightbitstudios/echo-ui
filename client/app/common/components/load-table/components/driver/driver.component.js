angular.module('echo.components.loadTable.driver', [
  'echo.filters.phoneNumber',
  'echo.filters.firstCharacter',
  'echo.enums.loadTypes',
  'echo.filters.onOff',
  'echo.filters.driverStatus'
])
  .component('driver', {
    templateUrl: 'app/common/components/load-table/components/driver/driver.template.html',
    bindings: {
      driver: '<',
      loadType: '<',
      assignedByEcho: '<'
    },
    controller: function (loadTypesEnum) {
      var that = this;

      that.noDriver = _.isUndefined(_.get(that.driver, 'id'));
      that.loadTypesEnum = loadTypesEnum;
    }
  });
