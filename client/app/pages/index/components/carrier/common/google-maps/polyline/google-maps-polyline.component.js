
'use strict';

angular.module('echo.components.googleMapsPolyline', [
  'echo.services.googleMapsApi'
]).component('googleMapsPolyline', {
  require: {
    mapsCtrl: '^googleMaps'
  },
  bindings: {
    mapPoints: '<',
    loadStatusCode: '<'
  },
  controller: function (googleMapsApi, mapConstants) {

    var that = this;

    this.completedRoute = [];
    this.incompleteRoute = [];

    this.$onInit = function () {
      if (!_.isEmpty(this.mapPoints)){
        this.parseMapPoints();
        this.drawCompletedRoute();
        this.drawIncompleteRoute();
      }
    };

    this.drawCompletedRoute = function() {
      if(this.completedRoute.length > 0){
        // Create the polyline, passing the symbol in the 'icons' property.
        // Give the line an opacity of 0.
        // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
        googleMapsApi.then(function (google) {
          that.incompletePolyline = new google.maps.Polyline({
            path: that.completedRoute,
            geodesic: false,
            strokeColor: '#3daf2c',
            strokeOpacity: 1.0,
            strokeWeight: 4,
            map: that.mapsCtrl.map
          });
        }, function(error) {
          console.warn('error loading google maps component', error);
        });
      }
    };

    this.drawIncompleteRoute = function() {
      if(this.incompleteRoute.length > 0) {
        // Create the polyline, passing the symbol in the 'icons' property.
        // Give the line an opacity of 0.
        // Repeat the symbol at intervals of 20 pixels to create the dashed effect.
        googleMapsApi.then(function(google) {
          that.incompletePolyline = new google.maps.Polyline({
            path: that.incompleteRoute,
            strokeOpacity: 0,
            geodesic: false,
            icons: [{
              icon: {
                path: 'M 0,-1 0,1',
                strokeOpacity: 1,
                strokeColor: '#979797',
                scale: 4
              },
              offset: '0',
              repeat: '20px'
            }],
            map: that.mapsCtrl.map
          });
        }, function(error) {
          console.warn('error loading google maps component', error);
        });
      }
    };

    this.getNextStopOnArrival = function () {
      return _.find(that.mapPoints, function(stop) {
        return stop.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.INCOMPLETE &&
          stop.mapPoint.schedule.stopSchedule.actualArrival;
      });
    };

    this.parseMapPoints = function() {
      that.completedRoute = [];
      that.incompleteRoute = [];

      var isLoadDelivered = that.isLoadDelivered();

      if(isLoadDelivered) {
        // if delivered just show completed routes
        this.completedRoute = this.mapPoints.map(function(mp) {
          return mp.position;
        });
      }

      else {
        _.each(this.mapPoints, function(mapPoint) {
          var position = mapPoint.position;

          if (mapPoint.mapPoint.schedule.hasActualArrivalDate()) {
            that.completedRoute.push(position);
          } else {
            that.incompleteRoute.push(position);
          }
        });

        if(_.last(that.completedRoute)) {
          that.incompleteRoute.unshift(_.last(that.completedRoute));
        }
      }
    };

    this.isLoadDelivered = function (){
      //return true if the last stop's date is before today
      return this.mapPoints[this.mapPoints.length-1].mapPoint.schedule.hasActualArrivalDate();
    };

  }
});
