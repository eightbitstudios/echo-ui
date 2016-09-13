angular.module('echo.components.modal.milestones.reportEmpty.confirmEmpty', [
  'echo.components.modal.milestones.checkboxCard'
])
  .component('confirmEmpty', {
    templateUrl: 'app/common/components/modal/milestones/report-empty-modal/components/confirm-empty/confirm-empty.template.html',
    bindings: {
      reportEmpty: '<',
      checkboxItems: '='
    },
    controller: function () {
      var that = this;


      that.$onInit = function () {
        that.equipment = _(that.reportEmpty.equipment).filter({ isSpecialService: false }).map('displayName').join(', ');
        that.services = _(that.reportEmpty.equipment).filter({ isSpecialService: true }).map('displayName').join(', ');

        if (that.equipment.length === 0) {
          that.checkboxItems.equipmentCheckbox.isChecked = true;
        }

        if (that.services.length === 0) {
          that.checkboxItems.serviceCheckbox.isChecked = true;
        }

        if (that.reportEmpty.generalInstructions.length === 0) {
          that.checkboxItems.instructionCheckbox.isChecked = true;
        }
      };
    }
  });