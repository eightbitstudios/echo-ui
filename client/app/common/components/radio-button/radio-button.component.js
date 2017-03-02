'use strict';

angular.module('echo.components.radioButton', []).component('radioButton', {
  bindings: {
    ngModel: '=',
    value: '=',
    label: '@',
    name: '@',
    isDisabled: '='
  },
  templateUrl: 'app/common/components/radio-button/radio-button.component.html',
  controller: function() { }
});