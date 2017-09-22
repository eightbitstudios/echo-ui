angular.module('echo.components.loadMap.warehouseInfoWindow', [])
  .component('warehouseInfoWindow', {
    templateUrl: 'warehouse-info-window.template.html',
    bindings: {
      mapMarker: '<',
      totalTemporaryStops: '<'
    },
    controller: function (mapConstants) {
      var that = this;

      this.$onInit = function () {
        console.log('warehouse window mm', this.mapMarker);
        that.schedule = that.mapMarker.getWarehouseSchedule();
        that.isOrigin = that.mapMarker.isOrigin();
        that.isDestination = that.mapMarker.isDestination();
        that.isTemporaryStop = !that.mapMarker.isDestination() && !that.mapMarker.isOrigin();
        that.scheduleHeader = that.schedule.getDateLabel();

        if (that.isOrigin) {
          that.infoWindowHeader = 'Origin';
        } else if (that.isDestination) {
          that.infoWindowHeader = 'Destination';
        } else if (that.mapMarker.getMapPointType() === mapConstants.MAP_POINT_TYPE.CURRENT_LOCATION) {
          that.infoWindowHeader = 'Current Location';
        } else {
          that.infoWindowHeader = 'Stop {X} out of {Y}'
            .replace('{X}', that.mapMarker.getStopNumber())
            .replace('{Y}', that.totalTemporaryStops);
        }
      };
    }
  });
