angular.module('echo.components.loadMap', [
    'echo.services.googleMapsApi',
    'echo.services.googleMaps',
    'echo.components.googleMaps',
    'echo.components.googleMapsMarker',
    'echo.components.googleMapsInfoWindow',
    'echo.components.loadMap.detailedInfoWindow',
    'echo.components.loadMap.basicInfoWindow',
    'echo.components.loading',
    'echo.config.routes',
    'ui.router'
  ])
  .constant('googleMapsConst', {
    detailedInfoOffset: {
      x: 230,
      y: 310
    },
    defaultOffset: {
      x: 175,
      y: 105
    }
  })
  .component('loadMap', {
    templateUrl: 'load-map.component.html',
    bindings: {
      mapPoints: '=',
      detailedInfo: '<',
      showMap: '<',
      showExpanded: '<',
      viewMapHandler: '&',
      carrierId: '<',
      mapRefreshHandler: '&'
    },
    controller: function ($q, googleMapsApi, googleMaps, googleMapsConst, routesConfig, $state) {
      this.$onChanges = function(changeObj) {
        var that = this;

        if(_.get(changeObj.showMap, 'currentValue') || _.get(changeObj.showExpanded, 'currentValue')) {
          googleMapsApi.then(function (google) {
            that.google = google;
            return googleMaps.formatMapPoints(google, new google.maps.Geocoder(), that.mapPoints);
          }).then(function (mapSettings) {
            that.points = mapSettings.mapPoints;
            that.mapCenter = mapSettings.center;
          }).finally(function() {
            googleMaps.resizeAndCenter(that.google, that.map, that.points);
            that.showLoading = false;
          });
        } else {
          that.showLoading = true;
        }
      };

      this.$onInit = function() {
        this.popupOffset = this.detailedInfo ? googleMapsConst.detailedInfoOffset : googleMapsConst.defaultOffset;
        this.showLoading = true;
        this.mapCenter = null;
        this.map = null;
        _.forEach(this.mapPoints, function (mapPoint) {
          mapPoint.loadNumber = mapPoint.loadId;
        });
      };

      this.isLoadManagementPage = function(){
        return $state.current.name === routesConfig.INDEX.activeLoads.name;
      };
    }
  });
