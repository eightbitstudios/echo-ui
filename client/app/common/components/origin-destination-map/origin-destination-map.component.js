angular.module('echo.components.originDestinationMap', [
  'echo.services.googleMapsApi',
  'echo.services.googleMaps',
  'echo.components.googleMaps',
  'echo.components.googleMapsMarker'
])
  .component('originDestinationMap', {
    templateUrl: 'app/common/components/origin-destination-map/origin-destination-map.component.html',
    bindings: {
      mapPoint: '<'
    },
    controller: function ($q, googleMapsApi, googleMaps) {
      var that = this;

      that.$onInit = function () {
        that.showMap = false;
        var pickUp = _.get(that.mapPoint, 'pickUp');
        var delivery = _.get(that.mapPoint, 'delivery');
        that.mapCenter = null;
        that.mapPoints = [];
        that.mapPoints.push({ currentLocation: { cityName: _.get(pickUp, 'city'), stateCode: _.get(pickUp, 'state') }});
        that.mapPoints.push({ currentLocation: { cityName: _.get(delivery, 'city'), stateCode: _.get(delivery, 'state') }});

        googleMapsApi.then(function (google) {
          that.google = google;
          return googleMaps.formatMapPoints(google, new google.maps.Geocoder(), that.mapPoints, that.mapCenter);
        }).finally(function() {
          googleMaps.resizeAndCenter(that.google, that.map, that.mapPoints);
          that.showMap = true;
        });
      };

    }
  });
