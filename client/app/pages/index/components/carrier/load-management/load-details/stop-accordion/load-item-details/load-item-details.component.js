'use strict';

angular.module('echo.components.loadItemDetails', [
]).component('loadItemDetails', {
  bindings: {
    items: '<',
    totalWeight: '<'
  },
  templateUrl: 'load-item-details.component.html'
});
