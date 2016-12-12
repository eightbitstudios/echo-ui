'use strict';

angular.module('echo.components.detailsLocation', [
  'echo.services.googleMaps'
]).component('detailsLocation', {
  bindings: {
    stop: '<'
  },
  templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/stop-accordion/components/details-location/details-location.template.html',
  controller: function(googleMaps) {
    var that = this;

    that.getMapsUrl = function() {
      return googleMaps.getMapsUrlByCityState(that.stop.address, that.stop.city, that.stop.state);
    };
  }
});
