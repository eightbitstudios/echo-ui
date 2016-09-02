angular.module('echo.components.modal.milestones.reportEmpty', [
  'echo.components.modal.milestones.milestoneSidebar',
  'echo.components.modal.milestones.checkboxCard',
  'echo.components.modal.milestones.progressIndicator',
  'echo.components.modal.milestones.modalSteps',
  'echo.components.dateTimePicker',
  'echo.components.modal.milestones.locationSearch'
])
  .component('reportEmptyModal', {
    templateUrl: 'app/common/components/modal/milestones/report-empty-modal/report-empty-modal.template.html',
    bindings: {
      modalActions: '<',
      load: '<'
    },
    controller: function () {
      var that = this;
      that.modes = {
        confirm: 1,
        location: 2
      };
      that.date = undefined;
      that.timeZone = 'CST';
      that.minDate = moment();
      that.time = moment().format('HHmm');
      that.items = [{isChecked: false}, {isChecked: false}, {isChecked: false}];
      that.steps = [that.modes.confirm, that.modes.location];
      that.currentStep = that.modes.confirm;

      that.isNextStepEnabled = function() {
        return _.every(that.items, {isChecked: true});
      };
    }
  });