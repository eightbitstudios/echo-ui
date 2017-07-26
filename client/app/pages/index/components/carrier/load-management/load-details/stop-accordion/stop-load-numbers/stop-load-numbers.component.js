'use strict';

angular.module('echo.components.stopLoadNumbers', [
]).component('stopLoadNumbers', {
  bindings: {
    numbers: '<',
    isDelivery: '<'
  },
  templateUrl: 'stop-load-numbers.component.html'
});
