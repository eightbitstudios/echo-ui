angular.module('echo.components.modal.milestones.reportEmpty.confirmEmpty', [
  'echo.components.modal.milestones.checkboxCard'
])
  .component('confirmEmpty', {
    templateUrl: 'confirm-empty.component.html',
    bindings: {
      reportEmpty: '<',
      checkboxItems: '='
    },
    controller: function () {

      this.$onInit = function () {
        this.equipment = _(this.reportEmpty.equipment).filter({ isSpecialService: false }).map('displayName').join(', ');
        this.services = _(this.reportEmpty.equipment).filter({ isSpecialService: true }).map('displayName').join(', ');

        if (_.isEmpty(this.equipment)) {
          this.checkboxItems.equipmentCheckbox.isChecked = true;
        }

        if (_.isEmpty(this.services)) {
          this.checkboxItems.serviceCheckbox.isChecked = true;
        }

        if (_.isEmpty(this.reportEmpty.generalInstructions)) {
          this.checkboxItems.instructionCheckbox.isChecked = true;
        }
      };
    }
  });