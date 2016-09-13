'use strict';

angular.module('echo.components.checkbox', []).component('checkbox', {
  bindings: {
    model: '=',
    large: '<'
  },
  templateUrl: 'app/common/components/checkbox/checkbox.template.html',
  controller: function () {
  }
});