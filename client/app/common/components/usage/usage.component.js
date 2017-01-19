'use strict';

angular.module('echo.components.usage', []).component('usage', {
  bindings: {
    driver: '<'
  },
  templateUrl: 'app/common/components/usage/usage.template.html'
});