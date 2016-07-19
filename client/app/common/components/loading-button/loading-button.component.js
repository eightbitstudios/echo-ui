'use strict';

angular.module('echo.components.loadingButton', [
  'echo.components.loading',
]).component('loadingButton', {
  bindings: {
    buttonText: '@',
    buttonClass: '@',
    showLoading: '<',
    disableButton: '<',
    clickHandler: '&'
  },
  templateUrl: 'app/common/components/loading-button/loading-button.template.html',
  controller: function() {}
});