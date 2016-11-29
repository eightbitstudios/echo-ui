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
  transclude: true,
  templateUrl: 'app/common/components/loading-button/loading-button.template.html',
  controller: function() {
    var that = this;

    that.wrappedClickHandler = function() {
      if (!that.showLoading && !that.disableButton) {
        that.clickHandler();
      }
    };
  }
});
