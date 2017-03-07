'use strict';

angular.module('echo.components.loadingButton', [
  'echo.components.loading'
]).component('loadingButton', {
  bindings: {
    buttonText: '@',
    buttonClass: '@',
    showLoading: '<',
    disableButton: '<',
    clickHandler: '&'
  },
  transclude: true,
  templateUrl: 'loading-button.component.html'
});
