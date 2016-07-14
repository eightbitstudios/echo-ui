angular.module('echo.index.myCarriers.repAdmin', [
  'echo.components.navbar',
  'echo.components.searchBar',
  'echo.index.myCarriers.repAdmin.allCarriers',
  'echo.index.myCarriers.repAdmin.carrierDetails'
]).component('repAdmin', {
  templateUrl: 'app/pages/index/my-carriers/components/rep-admin/rep-admin.template.html',
  bindings: {}
});
