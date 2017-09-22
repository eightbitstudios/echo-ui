
'use strict';

angular.module('echo.components.googleMapsPolyline', [
  'echo.config.appConstants',
  'echo.services.googleMapsApi'
]).component('googleMapsPolyline', {
  require: {
    mapsCtrl: '^googleMapsLoadDetails'
  },
  bindings: {
    mapPoints: '<',
    loadStatusCode: '<'
  },
  controller: function (googleMapsApi, appConstants, mapConstants) {

    var that = this;

    this.completedRoute = [];
    this.incompleteRoute = [];

    this.$onInit = function () {
      console.log('polyline init', JSON.stringify(this.mapPoints));
      this.parseMapPoints();
      this.drawCompletedRoute();
      this.drawIncompleteRoute();
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
        // if deliverd just show completed routes
        this.completedRoute = _.chain(this.mapPoints)
            .map(function(mp) {
              if(!mp.isTrackAndTrace()){
                return mp.getPosition();
              }
            })
            .pull(undefined).pull(null)
            .value();
      }

      else {
        _.each(this.mapPoints, function(mapPoint) {
          var position = mapPoint.position;
          //var schedule = mapPoint.getWarehouseSchedule();

          if (new Date(mapPoint.mapPoint.schedule.getAppointmentStartDate())  < new Date().getTime()) {
            that.completedRoute.push(position);
          } else {
            that.incompleteRoute.push(position);
          }
        });

        if (that.trackAndTraceMapPointPosition) {
          that.completedRoute.push(that.trackAndTraceMapPointPosition);
          that.incompleteRoute.unshift(that.trackAndTraceMapPointPosition);
        } else if(_.last(that.completedRoute)) {
          that.incompleteRoute.unshift(_.last(that.completedRoute));
        }
      }
    };

    this.isLoadDelivered = function (){
      return new Date(this.mapPoints[this.mapPoints.length-1].mapPoint.schedule.getAppointmentStartDate()).getTime() < new Date().getTime();
    };

  }
});
