angular.module('echo.components.loadMap', [
  'echo.services.googleMapsApi',
  'echo.services.googleMaps',
  'echo.components.googleMaps',
  'echo.components.googleMapsMarker',
  'echo.components.googleMapsInfoWindow',
  'echo.components.loadMap.detailedInfoWindow',
  'echo.components.loadMap.basicInfoWindow',
  'echo.components.loading'
])
  .constant('googleMapsConst', {
    detailedInfoOffset: {
      x: 230,
      y: 262
    },
    defaultOffset: {
      x: 175,
      y: 125
    }
  })
  .component('loadMap', {
    templateUrl: 'app/common/components/load-map/load-map.template.html',
    bindings: {
      mapPoints: '=',
      detailedInfo: '<',
      showMap: '<',
      showExpanded: '<',
      viewMapHandler: '&',
      carrierId: '<',
      mapRefreshHandler: '&'
    },
    controller: function ($q, googleMapsApi, googleMaps, googleMapsConst) {
      var that = this;
      that.mapCenter = null;

      that.popupOffset = that.detailedInfo ? googleMapsConst.detailedInfoOffset : googleMapsConst.defaultOffset;
      _.forEach(that.mapPoints, function (mapPoint) {
        mapPoint.loadNumber = mapPoint.loadId;
      });

      that.$onChanges = function (changeObj) {
        console.log(that.showExpanded);
        if(_.get(changeObj.showMap, 'currentValue') || _.get(changeObj.showExpanded, 'currentValue')) {
          googleMapsApi.then(function (google) {
            that.google = google;
            return googleMaps.formatMapPoints(google, new google.maps.Geocoder(), that.mapPoints, that.mapCenter);
          }).finally(function() {
            googleMaps.resizeAndCenter(that.google, that.map, that.mapPoints);
            that.showLoading = false;
          });
        } else {
          that.showLoading = true;
        }
      };
    }
  });
