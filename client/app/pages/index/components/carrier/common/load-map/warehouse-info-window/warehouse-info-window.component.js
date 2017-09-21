angular.module('echo.components.loadMap.warehouseInfoWindow', [])
  .component('warehouseInfoWindow', {
    templateUrl: 'warehouse-info-window.template.html',
    bindings: {
      mapMarker: '<',
      totalTemporaryStops: '<'
    },
    controller: function () {
      var that = this;

      this.$onInit = function () {
        that.schedule = that.mapMarker.getWarehouseSchedule();
        that.isOrigin = that.mapMarker.isOrigin();
        that.isDestination = that.mapMarker.isDestination();
        that.isTemporaryStop = !that.mapMarker.isDestination() && !that.mapMarker.isOrigin();
        that.scheduleHeader = that.schedule.getDateLabel();

        if (that.isOrigin) {
          that.infoWindowHeader = 'Origin';
        } else if (that.isDestination) {
          that.infoWindowHeader = 'Destination';
        } else {
          that.infoWindowHeader = 'Stop {X} out of {Y}'
            .replace('{X}', that.mapMarker.getStopNumber() - 1)
            .replace('{Y}', that.totalTemporaryStops);
        }
      };
    }
  });
