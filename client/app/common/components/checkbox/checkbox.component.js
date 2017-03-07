'use strict';

angular.module('echo.components.checkbox', []).component('checkbox', {
  bindings: {
    model: '=',
    large: '<'
  },
  templateUrl: 'checkbox.component.html'
});