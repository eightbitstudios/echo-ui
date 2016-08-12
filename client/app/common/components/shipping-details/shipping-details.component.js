angular.module('echo.components.shippingDetails', [])
  .component('shippingDetails', {
    templateUrl: 'app/common/components/shipping-details/shipping-details.template.html',
    bindings: {
      shippingDetails: '<'
    },
    controller: function () {
      var that = this;

      if (_.isArray(that.shippingDetails)) {
        that.location = _.find(that.shippingDetails, { isCurrent: true }) ||  _.last(that.shippingDetails);
      } else {
        that.location = that.shippingDetails;
      }
    }
  });
