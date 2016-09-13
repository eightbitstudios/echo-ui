angular.module('echo.components.modal.milestones.modalSteps', [])
  .component('modalSteps', {
    templateUrl: 'app/common/components/modal/milestones/components/modal-steps/modal-steps.template.html',
    bindings: {
      currentStep: '=',
      steps: '<',
      isNextDisabled: '<',
      isBackDisabled: '<',
      modalActions: '<'
    },
    transclude: true,
    controller: function () {
      var that = this;
      that.nextStep = function () {
        if (that.currentStep < that.maxStep) {
          that.currentStep++;
        }
      };

      that.previousStep = function () {
        if (that.currentStep > 1) {
          that.currentStep--;
        }
      };

      that.$onInit = function () {
        that.maxStep = _.max(that.steps);
      };
    }
  });