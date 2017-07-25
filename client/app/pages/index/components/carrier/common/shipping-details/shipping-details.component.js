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
    controller: function (PagingModel) {

      this.pageClickHandler = function () {
        this.location = this.shippingDetails[this.paging.selectedPage - 1];
      };

      this.$onChanges = function (changeObject) {
        if (changeObject.shippingDetails.currentValue) {
          this.paging = new PagingModel(1);
          if (_.isArray(changeObject.shippingDetails.currentValue)) {
            this.location = _.find(changeObject.shippingDetails.currentValue, {
              isCurrent: true
            }) || _.last(changeObject.shippingDetails.currentValue);
            this.paging.selectedPage = _.findIndex(changeObject.shippingDetails.currentValue, this.location) + 1;
            this.paging.totalRecords = _.size(changeObject.shippingDetails.currentValue);
          } else {
            this.location = changeObject.shippingDetails.currentValue;
          }
        }
      };
    }
  });