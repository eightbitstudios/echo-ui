angular.module('echo.index.myCarriers.carrierAdmin', [
  'echo.index.myCarriers.myCompany',
  'echo.components.carrierAdminNav',
  'echo.components.carrierAdminFooter'
]).component('carrierAdmin', {
  bindings: {
    carrierDetails: '=',
    repDetails: '='
  },
  templateUrl: 'app/pages/index/my-carriers/components/carrier-admin/carrier-admin.template.html'
});
