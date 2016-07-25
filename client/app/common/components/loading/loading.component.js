'use strict';

angular.module('echo.components.loading', []).component('loading', {
  bindings: {
    showLoading: '<'
  },
  transclude: true,
  templateUrl: 'app/common/components/loading/loading.template.html',
  controller: function() { }
});