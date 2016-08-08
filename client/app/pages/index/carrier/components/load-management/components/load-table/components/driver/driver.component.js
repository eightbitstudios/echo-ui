angular.module('echo.index.carrier.loadManagement.loadTable.driver', [
  'echo.filters.phoneNumber',
  'echo.filters.firstCharacter'
])
  .component('driver', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-table/components/driver/driver.template.html',
    bindings: {
      driver: '<'
    },
    controller: function () {
      var that = this;

      that.noDriver = _.isUndefined(that.driver) || _.isNull(that.driver);
    }
  });
