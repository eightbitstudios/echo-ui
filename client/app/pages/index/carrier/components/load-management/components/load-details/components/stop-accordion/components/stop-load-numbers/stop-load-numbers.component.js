'use strict';

angular.module('echo.components.stopLoadNumbers', [
]).component('stopLoadNumbers', {
  bindings: {
    numbers: '<',
    isDelivery: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/stop-load-numbers/stop-load-numbers.component.html'
});
