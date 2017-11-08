'use strict';

angular.module('echo.components.loadItemDetails', [
]).component('loadItemDetails', {
  bindings: {
    items: '<',
    totalWeight: '<',
    stopType: '<'
  },
  templateUrl: 'load-item-details.component.html'
});
