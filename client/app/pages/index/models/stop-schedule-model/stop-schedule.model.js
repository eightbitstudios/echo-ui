angular.module('echo.models.stopScheduleModel', [
])
  .factory('StopScheduleModel', function () {

      /**
       * Check for any business specific validations like 0001-01-01 instances here
       * @param date
       * @returns {boolean}
       * @private
       */
      function _isInvalidDate(date) {
        if(date === '0001-01-01T00:00:00.0000000' || _.isNil(date) ){
          return true;
        }

        return false;
      }

      /**
       * Convert date param to moment object
       * @param date {moment|date|String}
       * @returns {moment}
       * @private
       */
      function _convertToMoment(date) {
        if(moment.isMoment(date)) {
          // Already a moment object
          return date;
        }

        else if(!_isInvalidDate(date) && moment(date).isValid()){
          // Valid string or didn't pass echo specific exceptions
          // so let moment parse it - we cant guarantee parsing of non ISO formatted date strings
          return new moment(date);
        }
      }


      function StopScheduleModel(stopSchedule) {
        this.stopSchedule = {};

        this.setStopType(stopSchedule.stopType);
        this.setAppointmentStartDate(stopSchedule.appointmentStart);
        this.setAppointmentEndDate(stopSchedule.appointmentEnd);
        this.setActualArrivalDate(stopSchedule.actualArrival);
        this.setActualDepartureDate(stopSchedule.actualDeparture);
      }

      StopScheduleModel.prototype.setStopType = function (stopType) {
        this.stopSchedule.stopType = stopType;
      };


      StopScheduleModel.prototype.getAppointmentStartDate = function () {
        return this.stopSchedule.appointmentStart;
      };

      StopScheduleModel.prototype.setAppointmentStartDate = function(date) {
        this.stopSchedule.appointmentStart = _convertToMoment(date);
      };



      StopScheduleModel.prototype.getAppointmentEndDate = function () {
        return this.stopSchedule.appointmentEnd;
      };

      StopScheduleModel.prototype.setAppointmentEndDate = function(date) {
        this.stopSchedule.appointmentEnd = _convertToMoment(date);
      };

      StopScheduleModel.prototype.getActualArrivalDate = function () {
        return this.stopSchedule.actualArrival;
      };

      StopScheduleModel.prototype.setActualArrivalDate = function(date) {
        this.stopSchedule.actualArrival = _convertToMoment(date);
      };

      StopScheduleModel.prototype.hasActualArrivalDate = function() {
        return !_.isEmpty(this.getActualArrivalDate());
      };

      StopScheduleModel.prototype.getActualDepartureDate = function () {
        return this.stopSchedule.actualDeparture;
      };

      StopScheduleModel.prototype.setActualDepartureDate = function(date) {
        this.stopSchedule.actualDeparture = _convertToMoment(date);
      };

      StopScheduleModel.prototype.hasActualDepartureDate = function() {
        return !_.isEmpty(this.getActualDepartureDate());
      };

      StopScheduleModel.prototype.hasSameDayAppointment = function() {
        var start =  this.getAppointmentStartDate() ? this.getAppointmentStartDate().format('YYYY-DD-MM') : '';
        var end = this.getAppointmentEndDate() ? this.getAppointmentEndDate().format('YYYY-DD-MM') : '';

        return start === end;
      };

      StopScheduleModel.prototype.getDate = function() {

        if(this.hasActualDepartureDate()){
          return this.getActualDepartureDate().format('ddd MMM D');
        }

        else {
          if (this.hasSameDayAppointment()){
            if(this.getAppointmentStartDate()) {
              return this.getAppointmentStartDate().format('ddd MMM D');
            }
            return '';
          } else {
            var start =  this.getAppointmentStartDate() ? this.getAppointmentStartDate().format('ddd MMM D h:mm A') : '';
            var end = this.getAppointmentEndDate() ? this.getAppointmentEndDate().format('ddd MMM D h:mm A') : '';
            var delimiter = start && end ? ' - ' : '';

            return start + delimiter + end;
          }
        }
      };

      StopScheduleModel.prototype.getTime = function() {

        if(this.hasActualDepartureDate()){
          if( this.getActualDepartureDate()) {
            return this.getActualDepartureDate().format('h:mm A');
          }
          return '';
        }

        // We already display time inline with date on appointments that span multiple days
        else if(this.hasSameDayAppointment()){
          var start =  this.getAppointmentStartDate() ? this.getAppointmentStartDate().format('h:mm A') : '';
          var end = this.getAppointmentEndDate() ? this.getAppointmentEndDate().format('h:mm A') : '';
          var delimiter = start && end ? ' - ' : '';

          return start + delimiter + end;
        }
      };

      return StopScheduleModel;
});
