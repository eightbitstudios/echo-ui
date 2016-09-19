angular.module('echo.components.modal.milestones.checkboxCard', [
  'echo.components.checkbox'
]).component('checkboxCard', {
    templateUrl: 'app/common/components/modal/milestones/components/checkbox-card/checkbox-card.template.html',
    transclude: true,
    bindings: {
      isChecked: '='
    },
    controller: function () {
    }
  });