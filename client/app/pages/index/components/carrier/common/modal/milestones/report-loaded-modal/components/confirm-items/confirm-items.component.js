angular.module('echo.components.modal.milestones.reportLoaded.confirmItems', [])
  .component('confirmItems', {
    templateUrl: 'confirm-items.component.html',
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