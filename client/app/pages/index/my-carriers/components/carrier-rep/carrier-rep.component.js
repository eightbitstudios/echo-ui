angular.module('echo.index.myCarriers.carrierRep', [
  'echo.components.carrierRepNav'
]).component('carrierRep', {
  templateUrl: 'app/pages/index/my-carriers/components/carrier-rep/carrier-rep.template.html',
  bindings: {
    carrierDetails: '='
  }
});
