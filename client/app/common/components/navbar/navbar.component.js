'use strict';

angular.module('echo.components.navbar', []).component('navbar', {
  bindings: {
    carrierDetails: '=',
    user: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/navbar/navbar.template.html'
});