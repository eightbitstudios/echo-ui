angular.module('echo.components.modal.milestones.progressIndicator', [])
.component('progressIndicator', {
  templateUrl: 'progress-indicator.component.html',
  bindings: {
    steps: '<',
    currentStep: '<'
  }
});