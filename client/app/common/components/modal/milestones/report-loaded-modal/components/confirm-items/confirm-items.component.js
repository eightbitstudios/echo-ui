angular.module('echo.components.modal.milestones.reportLoaded.confirmItems', [
  'echo.models.checkbox'
])
  .component('confirmItems', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/components/confirm-items/confirm-items.template.html',
    bindings: {
      items: '<',
      pickupNumbers: '<'
    },
    controller: function (CheckboxModel) {
      var that = this;

      that.formattedPickupNumbers = _.join(that.pickupNumbers, ', ');
      that.checkboxItems = _.map(that.items, function() {
        return new CheckboxModel();
      });
    }
  });