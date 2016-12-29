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
  templateUrl: 'app/common/components/loading/loading.template.html',
  controller: function() { }
});
