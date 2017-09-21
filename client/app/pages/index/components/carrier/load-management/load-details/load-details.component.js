angular.module('echo.index.carrier.loadManagement.loadDetails', [
  'echo.config.routes',
  'echo.components.echoRepContact',
  'echo.components.stopAccordion',
  'echo.components.equipment',
  'echo.components.loadDetailsMap',
  'echo.index.carrier.loadManagement.loadDetails.loadDetail',
  'echo.index.carrier.loadManagement.loadDetails.documents',
  'echo.index.carrier.loadManagement.loadDetails.activityLog',
  'echo.api.loads',
  'echo.index.carrier.previousState',
  'echo.components.invoiceAccordion',
  'echo.api.invoices',

  'echo.models.stopScheduleModel',
  'echo.config.mapConstants',
  'echo.models.mapPointModel'
]).component('loadDetails', {
  templateUrl: 'load-details.component.html',
  controller: function($q, $stateParams, store$, loadsApi, invoicesApi, StopScheduleModel, MapPointModel, mapConstants) {
    var that = this;

    that.getMapPoint = function() {
      that.showMap = false;
      that.mapPoints = [];
      loadsApi.fetchMapPointByLoadGuid(_.get(that.loadDetails, 'loadGuid'))
        .then(function(mapPointData) {
          console.log(mapPointData);
          console.log('map point import', that.buildMapPointsFromStops(mapPointData.pickUp, mapPointData.delivery, [mapPointData.currentLocation]));
          if (mapPointData) {
            that.mapPoints = that.buildMapPointsFromStops(mapPointData.pickUp, mapPointData.delivery, [mapPointData.currentLocation]);
          }
          that.showMap = true;
        });
    };

    that.getStopScheduleModel = function(stop) {
      return new StopScheduleModel({
        stopType: stop.stopType,
        appointmentStart: stop.appointmentStart,
        appointmentEnd: stop.appointmentEnd,
        actualArrival: stop.actualArrival,
        actualDeparture: stop.actualDeparture
      });
    };

    that.getStopMapPointModel = function(stop, mapPointType) {
      console.log('stop', stop);
      var type = stop.isCurrent ? 'INCOMPLETE' : 'COMPLETE';

      return new MapPointModel({
        stopNumber: _.get(stop, 'order'),
        mapPointType: mapPointType || type,
        countryCode:  _.get(stop, 'country'),
        clientWarehouseId:  _.get(stop, 'id'),
        name:  _.get(stop, 'name'),
        address1:  _.get(stop, 'address'),
        address2:  _.get(stop, 'address2'),
        address3:  _.get(stop, 'address3'),
        city:  _.get(stop, 'city') || _.get(stop, 'cityName'),
        stateCode:  _.get(stop, 'state') || _.get(stop, 'stateCode'),
        postalCode:  _.get(stop, 'zip'),
        schedule: this.getStopScheduleModel(stop)
      });
    };

    that.buildMapPointsFromStops = function(origin, destination, stops) {
      var that = this;

      var firstStop = [this.getStopMapPointModel(origin, mapConstants.MAP_POINT_TYPE.ORIGIN)];
      var lastStop = [this.getStopMapPointModel(destination, mapConstants.MAP_POINT_TYPE.DESTINATION)];
      var additionalStops = _.map(stops, function (stop) {
        return that.getStopMapPointModel(stop);
      });

      that.loadStatusCode = !destination.isCurrent;

      return firstStop.concat(additionalStops).concat(lastStop);
    };


    that.fetchLoadDetails = function() {

      that.showLoading = true;
      that.showMap = false;

      loadsApi.fetchLoadDetails(that.loadId)
        .then(function(loadDetails) {
          that.loadDetails = loadDetails;
          that.pickupNumbers = _.map(that.loadDetails.pickUp, 'pickupNumber');
          that.deliveryNumbers = _.map(that.loadDetails.delivery, 'pickupNumber');
          that.getMapPoint();
          return invoicesApi.fetchInvoiceDetailsByLoadId(that.loadDetails.loadNumber).then(function(invoiceDetails) {
            that.invoiceDetails = invoiceDetails;
          }).finally(function() {
            that.showLoading = false;
          });
        });
    };

    that.$onInit = function() {

      var state = store$.getState();

      that.repDetails = state.rep;
      that.carrierId = state.carrier.carrierId;
      that.loadId = $stateParams.loadId;

      that.fetchLoadDetails();
    };

    /**
     * Merge in coordinates to load detail map points as we determine them.
     * This will help prevent excessive geocode api calls if a user bounces back
     * and forth between map views.
     * @param mapMarkers
     */
    this.mergeCoordinates = function(mapMarkers) {
      _.each(mapMarkers, function(marker) {
        _.each(that.mapPoints, function(mapPoint) {
          if(mapPoint.getClientWarehouseId() === marker.getClientWarehouseId()){
            mapPoint.setPosition(marker.getPosition());
          }
        });
      });
    };
  }
});
