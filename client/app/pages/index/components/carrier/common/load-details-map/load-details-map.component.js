angular.module('echo.components.loadDetailsMap', [
  'echo.config.appConstants',
  'echo.services.googleMapsApi',
  'echo.services.googleMaps',
  'echo.components.googleMaps',
  'echo.components.googleMapsMarker',
  'echo.components.googleMapsPolyline',
  'echo.components.googleMapsInfoWindow',
  'echo.components.loadMap.warehouseInfoWindow',
  'echo.components.loading'
])
  .constant('googleMapsConst', {
    detailedInfoOffset: {
      x: 230,
      y: 308
    },
    defaultOffset: {
      x: 175,
      y: 125
    }
  })
/**
 * showMap [boolean] - flag to display map or not. note, that if the map is initalized before the dom has had a chance to render
 * the div/container for the google map undefined exceptions may occur. Its best to toggle this after a promise of some sort
 * (ex. after network call to get load detail or track and trace info)
 *
 * onGeocodeComplete - Useful for merging geocoded locations if they are being cached in a parent component to help reduce the api calls (ex: EchoShip
 * displays a map summary (origin and destination) but also provides a detailed map (with all intermediate stops).
 */
  .component('loadDetailsMap', {
    templateUrl: 'load-details-map.component.html',
    bindings: {
      mapType: '<',
      mapPoints: '<',
      loadStatusCode: '<',
      detailedInfo: '<',
      showMap: '<',
      onError: '&?',
      onGeocodeComplete: '&?'
    },
    controller: function ($q, $window,  mapConstants, googleMapsApi, googleMaps, googleMapsConst) {

      var that = this;

      this.getNextStopOnArrival = function () {
        return _.find(that.mapPoints, function(stop) {
          return stop.isIncomplete() && stop.getWarehouseSchedule().getActualArrivalDate();
        });
      };

      this.toMapMarkers = function (newMapPoints, mapPoint) {
        if ((!that.getNextStopOnArrival(that.mapPoints))) {
          newMapPoints.push(mapPoint);
        }

        return newMapPoints;
      };


      this.formatMapPoints = function (google) {
        var geocoder = new google.maps.Geocoder();
        var promises = [];

        _.forEach(this.mapMarkers, function (mapMarker) {
          if(!mapMarker.getPosition()) {
            //format for use with existing google maps service
            mapMarker.currentLocation = {};
            mapMarker.currentLocation.cityName = mapMarker.getCity();
            mapMarker.currentLocation.stateCode = mapMarker.getStateCode();
            promises.push(googleMaps.appendPosition(geocoder, mapMarker));
          }
        });

        if (_.size(promises) === 0) {
          this.mapCenter = googleMaps.findCenter(this.google, this.mapMarkers);
          return this.mapCenter;
        } else {
          return $q.all(promises).then(
            function () {
              that.mapMarkers = _.filter(that.mapMarkers, function (point) {
                return !!point.getPositionAsLatLng();
              });

              that.mapCenter = googleMaps.findCenter(that.google, that.mapMarkers);
            },
            function(){
              // if we registered an optional onError Call back
              if(that.onError){
                that.onError();
              }
            });
        }
      };


      this.popupOffset = this.detailedInfo ? googleMapsConst.detailedInfoOffset : googleMapsConst.defaultOffset;

      this.$onChanges = function (changeObj) {

        // Overriding this maps object on
        if(_.get($window, 'google.maps._echoAuthError') === 'AUTH_ERROR'){
          this.onError();
          return;
        }

        this.mapMarkers = that.mapPoints;

        if(changeObj.showMap.currentValue) {
          googleMapsApi.then(
            function (google) {
              that.google = google;

              // Stops constitue the are the route minus the origin and destination
              that.totalTemporaryStops = _.reduce(that.mapPoints, function(count, point) {
                var isTemporaryStop = !point.isOrigin() && !point.isDestination() && point.getMapPointType() !== mapConstants.MAP_POINT_TYPE.CURRENT_LOCATION;
                return isTemporaryStop ? count + 1 : count;
              }, 0);

              return that.formatMapPoints(google);
            },
            function(error) {
              console.warn('error loading google maps component', error);
              if (this.onError){
                this.onError();
              }
            }).finally(function() {
              if(that.onGeocodeComplete) {
                that.onGeocodeComplete({mapMarkers: that.mapMarkers});
              }

              that.showLoading = false;
              that.geoCodeComplete = true;
            });
        } else {
          this.showLoading = true;
        }
      };
    }
  });
