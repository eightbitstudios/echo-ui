angular.module('echo.components.modal.milestones.modalSteps', [])
  .component('modalSteps', {
    templateUrl: 'modal-steps.component.html',
    bindings: {
      currentStep: '=',
      steps: '<',
      isNextDisabled: '<',
      isBackDisabled: '<',
      modalActions: '<'
    },
    transclude: true,
    controller: function () {
      this.nextStep = function () {
        if (this.currentStep < this.maxStep) {
          this.currentStep++;
        }
      };

      this.previousStep = function () {
        if (this.currentStep > 1) {
          this.currentStep--;
        }
      };

      this.$onInit = function () {
        this.maxStep = _.max(this.steps);
      };
    }
  });