angular.module('echo.index.carrier.loadManagement.loadTable', [
  'echo.components.location',
  'echo.index.carrier.loadManagement.loadTable.driver',
  'echo.index.carrier.loadManagement.loadTable.action',
  'echo.index.carrier.loadManagement.loadTable.load'
])
  .component('loadTable', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-table/load-table.template.html',
    bindings: {},
    controller: function () {}
  });
