'use strict';

angular.module('echo.components.loadItemDetails', [
]).component('loadItemDetails', {
  bindings: {
    items: '<',
    totalWeight: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/load-item-details/load-item-details.component.html'
});
