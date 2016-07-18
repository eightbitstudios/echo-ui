'use strict';

angular.module('echo.components.loadingButton', [
  'echo.components.loading',
]).component('loadingButton', {
  bindings: {
    buttonText: '@',
    showLoading: '<',
    disableButton: '<',
    clickHandler: '&'
  },
  templateUrl: 'app/common/components/loading-button/loading-button.template.html',
  controller: function() {}
});