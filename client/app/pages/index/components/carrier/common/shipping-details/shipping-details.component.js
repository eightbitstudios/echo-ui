angular.module('echo.components.shippingDetails', [
    'echo.components.pagination',
    'echo.models.paging'
  ])
  .component('shippingDetails', {
    templateUrl: 'shipping-details.component.html',
    bindings: {
      shippingDetails: '<',
      inactive: '<'
    },
    controller: function(PagingModel) {

      this.pageClickHandler = function() {
        this.location = this.shippingDetails[this.paging.selectedPage - 1];
      };

      this.$onInit = function() {
        this.paging = new PagingModel(1);
        if (_.isArray(this.shippingDetails)) {
          this.location = _.find(this.shippingDetails, {
            isCurrent: true
          }) || _.last(this.shippingDetails);
          this.paging.selectedPage = _.findIndex(this.shippingDetails, this.location) + 1;
          this.paging.totalRecords = _.size(this.shippingDetails);
        } else {
          this.location = this.shippingDetails;
        }
      };
    }
  });