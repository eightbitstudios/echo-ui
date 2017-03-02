angular.module('echo.components.modal.milestones.progressIndicator', [])
.component('progressIndicator', {
  templateUrl: 'app/common/components/modal/milestones/components/progress-indicator/progress-indicator.component.html',
  bindings: {
    steps: '<',
    currentStep: '<'
  }
});