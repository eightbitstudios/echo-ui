'use strict';

angular.module('echo.components.modal', [
  'ui.bootstrap'
]).component('appModal', {
  templateUrl: 'app/common/components/modal/modal.template.html',
  bindings: {
    title: '<',
    titleIconClasses: '<',
    previousButtonText: '<',
    continueButtonText: '<',
    onContinue: '&?',
    onCancel: '&'
  },
  transclude: true,
  controller: function () { }
});