
angular.module('echo.models.mapPointModel', [
  'echo.config.mapConstants'
]).factory('MapPointModel', function (mapConstants) {


  function MapPointModel(mapPoint) {
    mapPoint = mapPoint || {};

    this.mapPoint = mapPoint;

    this.mapPoint.stopNumber = mapPoint.stopNumber;
    this.mapPoint.clientWarehouseId = mapPoint.clientWarehouseId;
    this.mapPoint.mapPointType = mapPoint.mapPointType;
    this.mapPoint.countryCode = mapPoint.countryCode;
    this.mapPoint.address1 = mapPoint.address1;
    this.mapPoint.address2 = mapPoint.address2;
    this.mapPoint.address3 = mapPoint.address3;
    this.mapPoint.city = mapPoint.city;
    this.mapPoint.stateCode = mapPoint.stateCode;
    this.mapPoint.postalCode = mapPoint.postalCode;
    this.setPosition(mapPoint.position);

    // Extra Warehouse Details
    this.mapPoint.name = mapPoint.name;
    this.mapPoint.scheduleModel = mapPoint.scheduleModel;

    // Extra Track and Trace Details
    this.mapPoint.trackAndTraceTimestamp = mapPoint.trackAndTraceTimestamp;
    this.mapPoint.trackAndTraceStatus = mapPoint.trackAndTraceStatus;

    //driver details
    this.mapPoint.driverName = mapPoint.driverName;
    this.mapPoint.reportTime = mapPoint.reportTime;
  }

  MapPointModel.prototype.setMapPointType = function(mapPointType) {
    this.mapPoint.mapPointType = mapPointType;
  };

  MapPointModel.prototype.getMapPointType = function() {
    return this.mapPoint.mapPointType;
  };

  MapPointModel.prototype.getClientWarehouseId = function() {
    return this.mapPoint.clientWarehouseId;
  };

  MapPointModel.prototype.getName = function() {
    return this.mapPoint.name;
  };

  MapPointModel.prototype.getStopNumber = function() {
    return this.mapPoint.stopNumber;
  };

  MapPointModel.prototype.getCountryCode = function() {
    return this.mapPoint.countryCode;
  };

  MapPointModel.prototype.getAddress1 = function() {
    return this.mapPoint.address1;
  };

  MapPointModel.prototype.getAddress2 = function() {
    return this.mapPoint.address2;
  };

  MapPointModel.prototype.getAddress3 = function() {
    return this.mapPoint.address3;
  };

  MapPointModel.prototype.getCity = function() {
    return this.mapPoint.city;
  };

  MapPointModel.prototype.getStateCode = function() {
    return this.mapPoint.stateCode;
  };

  MapPointModel.prototype.getPostalCode = function() {
    return this.mapPoint.postalCode;
  };

  MapPointModel.prototype.getPosition = function() {
    return this.mapPoint.position;
  };

  MapPointModel.prototype.getPositionAsLatLng = function() {
    /*jshint ignore:start*/
    if(this.mapPoint.position){
      return new google.maps.LatLng(this.mapPoint.position);
    }
    /*jshint ignore:end*/
  };

  MapPointModel.prototype.setPosition = function(position) {
    if(_.get(window, 'google.maps.LatLng') && position instanceof google.maps.LatLng){
      this.mapPoint.position = position.toJSON();
    } else {
      this.mapPoint.position = position;
    }
  };

  MapPointModel.prototype.isOrigin = function() {
    return this.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.ORIGIN;
  };

  MapPointModel.prototype.isDestination = function() {
    return this.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.DESTINATION;
  };

  MapPointModel.prototype.isComplete = function() {
    return this.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.COMPLETE;
  };

  MapPointModel.prototype.isIncomplete = function() {
    return this.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.INCOMPLETE;
  };

  MapPointModel.prototype.isTrackAndTrace = function() {
    return this.mapPoint.mapPointType === mapConstants.MAP_POINT_TYPE.TRACK_AND_TRACE;
  };

  MapPointModel.prototype.getWarehouseSchedule = function() {
    return this.mapPoint.schedule;
  };

  MapPointModel.prototype.getTrackAndTraceTimestamp = function() {
    return this.mapPoint.trackAndTraceTimestamp;
  };

  MapPointModel.prototype.getTrackAndTraceStatus = function() {
    return this.mapPoint.trackAndTraceStatus;
  };

  MapPointModel.prototype.isSameAddress = function(clientWarehouseId) {
    return this.getClientWarehouseId() === clientWarehouseId;
  };

  MapPointModel.prototype.getTrackAndTraceTimestampDisplay = function() {
    var dateObj = new Date(this.mapPoint.trackAndTraceTimestamp);
    return moment(dateObj).format('ddd MMM D h:mm A');
  };

  MapPointModel.prototype.getDriverName = function() {
    return _.trim(this.mapPoint.driverName);
  };

  MapPointModel.prototype.getReportTime = function() {
    return this.mapPoint.reportTime;
  };

  return MapPointModel;
});
