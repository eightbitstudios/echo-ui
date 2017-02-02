'use strict';

angular.module('echo.components.detailsLocation', [
  'echo.services.googleMaps'
]).component('detailsLocation', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/details-location/details-location.template.html',
  controller: function(googleMaps) {
    this.getMapsUrl = function() {
      return googleMaps.getMapsUrlByCityState(this.stop.address, this.stop.city, this.stop.state);
    };
  }
});
