angular.module('echo.index.myCarriers.carrierAdmin', [
  'echo.index.myCarriers.carrierAdmin.myCompany',
  'echo.index.myCarriers.carrierAdmin.dashboard',
  'echo.index.myCarriers.carrierAdmin.carrierAdminNav',
  'echo.components.navbar'
]).component('carrierAdmin', {
  bindings: {
    carrierDetails: '='
  },
  templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/carrier-admin.template.html'
});
