angular.module('echo.components.modal.milestones.progressIndicator', [])
.component('progressIndicator', {
  templateUrl: 'app/common/components/modal/milestones/components/progress-indicator/progress-indicator.template.html',
  bindings: {
    steps: '<',
    currentStep: '<'
  },
  controller: function () {
  }
});