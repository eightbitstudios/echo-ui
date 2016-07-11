angular.module('echo.index.myCarriers.repAdmin', [
  'echo.components.navbar'
]).component('repAdmin', {
  templateUrl: 'app/pages/index/my-carriers/components/rep-admin/rep-admin.template.html',
  bindings: {
    carrierDetails: '='
  }
});
