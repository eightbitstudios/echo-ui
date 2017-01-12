angular.module('echo.components.modal.milestones.reportLoaded.confirmItems', [])
  .component('confirmItems', {
    templateUrl: 'app/common/components/modal/milestones/report-loaded-modal/components/confirm-items/confirm-items.template.html',
    bindings: {
      items: '<',
      pickupNumbers: '<',
      checkboxItems: '<'
    },
    controller: function() {
      this.$onInit = function() {
        this.formattedPickupNumbers = _.join(this.pickupNumbers, ', ');
      };
    }
  });