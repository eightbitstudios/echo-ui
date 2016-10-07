angular.module('echo.components.shippingDetails', [
  'echo.components.pagination',
  'echo.models.paging'
])
  .component('shippingDetails', {
    templateUrl: 'app/common/components/shipping-details/shipping-details.template.html',
    bindings: {
      shippingDetails: '<',
      inactive: '<'
    },
    controller: function (PagingModel) {
      var that = this;
      that.paging = new PagingModel(1);

      if (_.isArray(that.shippingDetails)) {
        that.location = _.find(that.shippingDetails, { isCurrent: true }) ||  _.last(that.shippingDetails);
        that.paging.selectedPage = _.findIndex(that.shippingDetails, that.location) + 1;
        that.paging.totalRecords = _.size(that.shippingDetails);
      }

      that.pageClickHandler = function() {
        that.location = that.shippingDetails[that.paging.selectedPage - 1];
      };
    }
  });
