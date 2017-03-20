'use strict';

angular.module('echo.components.loading', [
  'echo.directives.fixedInContainer'
]).component('loading', {
  bindings: {
    showLoading: '<',
    overlay: '<',
    spinnerSize: '@',
    fixed: '<'
  },
  transclude: true,
  templateUrl: 'loading.component.html'
});
