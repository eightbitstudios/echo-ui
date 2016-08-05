angular.module('echo.components.shippingDetails', [
  'echo.filters.shippingDate'
])
  .component('shippingDetails', {
  templateUrl: 'app/common/components/shipping-details/shipping-details.template.html',
    bindings: {
      shippingDetails: '<'
    },
    controller: function () {
      var that = this;

      if(_.isArray(that.shippingDetails)) {
        that.location = _.find(that.shippingDetails, {isCurrent: true});
      } else {
        that.location = that.shippingDetails;
      }
    }
  });
