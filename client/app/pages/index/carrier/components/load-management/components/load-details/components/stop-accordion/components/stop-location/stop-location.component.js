'use strict';

angular.module('echo.components.stopLocation', [
  'echo.services.googleMaps'
]).component('stopLocation', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/stop-location/stop-location.component.html',
  controller: function(googleMaps) {
    this.getMapsUrl = function() {
      return googleMaps.getMapsUrlByCityState(this.stop.address, this.stop.city, this.stop.state);
    };
  }
});
