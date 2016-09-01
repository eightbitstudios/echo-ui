angular.module('echo.components.modal.milestones.checkboxCard', [
  'echo.components.checkbox'
]).component('checkboxCard', {
    templateUrl: 'app/common/components/modal/milestones/components/checkbox-card/checkbox-card.template.html',
    bindings: {
      item: '='
    },
    controller: function () {
    }
  });