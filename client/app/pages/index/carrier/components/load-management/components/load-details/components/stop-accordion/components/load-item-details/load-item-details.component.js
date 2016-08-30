'use strict';

angular.module('echo.components.loadItemDetails', [
]).component('loadItemDetails', {
  bindings: {
    items: '<',
    pickupNumber: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/load-item-details/load-item-details.template.html',
  controller: function() { 
    var that = this;

    that.pickupWeight = _.sumBy(that.items, 'estimatedWeight');
  }
});