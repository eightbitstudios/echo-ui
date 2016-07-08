angular.module('echo.index.myCarriers.carrierAdmin', [
  'echo.index.myCarriers.myCompany',
  'echo.index.myCarriers.dashboard',
  'echo.components.carrierAdminNav',
  'echo.components.navbar'
]).component('carrierAdmin', {
  bindings: {
    carrierDetails: '='
  },
  templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/carrier-admin.template.html'
});
