'use strict';

angular.module('echo.components.loading', []).component('loading', {
  bindings: {
    showLoading: '<',
    overlay: '<'
  },
  transclude: true,
  templateUrl: 'app/common/components/loading/loading.template.html',
  controller: function() { }
});