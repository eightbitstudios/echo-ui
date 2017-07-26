angular.module('echo.components.modal.milestones.checkboxCard', [
  'echo.components.checkbox'
]).component('checkboxCard', {
    templateUrl: 'checkbox-card.component.html',
    transclude: true,
    bindings: {
      isChecked: '='
    }
  });