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
          if (mapPointData) {
            that.mapPoints = that.buildMapPointsFromStops(mapPointData.currentLocation, mapPointData.timeStamp);
          }
          that.showMap = true;
        });
    };

    that.getStopScheduleModel = function(stop) {
      return new StopScheduleModel({
        stopType: stop.stopType,
        appointmentStart: stop.startDate,
        actualArrival: stop.arrivalDate,
        actualDeparture: stop.departureDate
      });
    };

    that.getStopMapPointModel = function(stop) {

      return new MapPointModel({
        stopNumber: _.get(stop, 'stopNumber'),
        mapPointType: _.get(stop, 'mapPointType'),
        countryCode:  _.get(stop, 'country'),
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

    that.buildMapPointsFromStops = function(currentLocation, timeStamp) {

      var stops = [];

      stops = stops.concat(that.loadDetails.pickUp).concat(that.loadDetails.delivery);

      //sort stops by startDate, before current location is added, so we can assign stop numbers
      stops = _.sortBy(stops, function(stop) { return new Date(stop.startDate); });
      _.forEach(stops, function(stop, index){
        //add stop number here
        stop.stopNumber = index;

        //assign map point type incomplete or complete based on whether the stop has an arrival date or not
        if (stop.arrivalDate) {
          stop.mapPointType = mapConstants.MAP_POINT_TYPE.COMPLETE;
        }
        else {
          stop.mapPointType = mapConstants.MAP_POINT_TYPE.INCOMPLETE;
        }
      });

      //designate the first stop as the origin and the last stop as the destination (overwrite type set previously)
      stops[0].mapPointType =  mapConstants.MAP_POINT_TYPE.ORIGIN;
      _.last(stops).mapPointType =  mapConstants.MAP_POINT_TYPE.DESTINATION;

      //add currentLocation as a stop with date as the current date, if the load is not delivered
      if (currentLocation && !_.last(stops).arrivalDate){
        //timeStamp comes in the format x hours/minutes/seconds ago, use moment to parse that into a usable format
        var timeStampArr = timeStamp.split(' ');
        currentLocation.arrivalDate = currentLocation.startDate = moment().subtract(timeStampArr[0].replace(',', ''), timeStampArr[1]);
        currentLocation.mapPointType = mapConstants.MAP_POINT_TYPE.CURRENT_LOCATION;
        stops.push(currentLocation);
      }

      stops = _.sortBy(stops, function(stop) { return new Date(stop.startDate); });

      stops = _.map(stops, function(stop){
        return that.getStopMapPointModel(stop);
      });

      return stops;
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
