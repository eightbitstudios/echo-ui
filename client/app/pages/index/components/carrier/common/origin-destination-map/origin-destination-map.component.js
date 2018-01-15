angular.module('echo.components.originDestinationMap', [
  'echo.services.googleMapsApi',
  'echo.services.googleMaps',
  'echo.components.googleMaps',
  'echo.components.googleMapsMarker',
  'echo.models.mapPointModel',
  'echo.config.mapConstants'
])
  .component('originDestinationMap', {
    templateUrl: 'origin-destination-map.component.html',
    bindings: {
      mapPoint: '<'
    },
    controller: function ($q, googleMapsApi, mapConstants,  MapPointModel, googleMaps ) {
      var that = this;

      that.$onInit = function () {
        that.showMap = false;
        var pickUp = _.get(that.mapPoint, 'pickUp');
        var delivery = _.get(that.mapPoint, 'delivery');
        that.showExpanded = true;
        that.mapCenter = null;
        that.mapPoints = [];
        that.mapPoints.push({ currentLocation: { cityName: _.get(pickUp, 'city'), stateCode: _.get(pickUp, 'state') }});
        that.mapPoints.push({ currentLocation: { cityName: _.get(delivery, 'city'), stateCode: _.get(delivery, 'state') }});

        googleMapsApi.then(function (google) {
          that.google = google;
          return googleMaps.formatMapPoints(google, new google.maps.Geocoder(), that.mapPoints, that.mapCenter);
        }).then(function(mapSettings) {

          that.points = [
            new MapPointModel(mapSettings.mapPoints[0]),
            new MapPointModel(mapSettings.mapPoints[1])
          ];
          that.points[0].setMapPointType(mapConstants.MAP_POINT_TYPE.ORIGIN);
          that.points[1].setMapPointType(mapConstants.MAP_POINT_TYPE.DESTINATION);

          that.mapCenter = mapSettings.center;
          googleMaps.resizeAndCenter(that.google, that.map, that.points);
          that.showMap = true;
        });
      };

    }
  });
