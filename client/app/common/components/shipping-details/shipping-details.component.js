angular.module('echo.components.shippingDetails', [
  'echo.filters.shippingDate'
])
  .component('shippingDetails', {
  templateUrl: 'app/common/components/shipping-details/shipping-details.template.html',
    bindings: {
      shippingDetails: '<'
    },
    controller: function () {}
  });
