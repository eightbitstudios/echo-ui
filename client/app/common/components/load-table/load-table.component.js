angular.module('echo.components.loadTable', [
  'echo.components.shippingDetails',
  'echo.components.loadTable.driver',
  'echo.components.loadTable.action',
  'echo.components.loadTable.load'
]).component('loadTable', {
    templateUrl: 'app/common/components/load-table/load-table.template.html',
    bindings: {
      loads: '<',
      loadType: '<',
      showLoading: '<',
      carrierId: '<',
      refreshTableCallback: '&'
    },
    controller: function () {}
  });
