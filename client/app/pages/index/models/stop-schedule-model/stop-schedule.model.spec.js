describe('StopScheduleModel', function () {
  var stopScheduleModel;

  beforeEach(function() {
    module('echo.models.stopScheduleModel');
  });

  beforeEach(inject(function(StopScheduleModel) {
    stopScheduleModel = new StopScheduleModel({
      stopType: 'Pickup',
      appointmentStart: new moment(),
      appointmentEnd: '2016-04-23T00:00:00',
      actualArrival: null,
      actualDeparture: null
    });

  }));


  it('should parse dates to moment', function() {
    var appointmentStart = stopScheduleModel.getAppointmentStartDate();
    var appointmentEnd = stopScheduleModel.getAppointmentEndDate();
    var actualArrival = stopScheduleModel.getActualArrivalDate();
    var actualDeparture = stopScheduleModel.getActualDepartureDate();

    console.log('appointmentStart ' + appointmentStart);
    expect(moment.isMoment(appointmentStart)).toBe(true);
    expect(moment.isMoment(appointmentEnd)).toBe(true);
    expect(moment.isMoment(actualArrival)).toBe(false);
    expect(moment.isMoment(actualDeparture)).toBe(false);
  });


  it('should identify stop types', function() {
    expect(stopScheduleModel.isPickup()).toBe(true);
    expect(stopScheduleModel.isDelivery()).toBe(false);

    stopScheduleModel.setStopType('Delivery');

    expect(stopScheduleModel.isPickup()).toBe(false);
    expect(stopScheduleModel.isDelivery()).toBe(true);
  });

  it('should identify it if has an appointment', function() {
    expect(stopScheduleModel.hasAppointment()).toBe(true);
  });

  it('should identify it if has an actual arrival and departure', function() {
    expect(stopScheduleModel.hasActualArrivalDate()).toBe(false);
    expect(stopScheduleModel.hasActualDepartureDate()).toBe(false);

    stopScheduleModel.setActualArrivalDate(new moment());
    stopScheduleModel.setActualDepartureDate(new moment());

    expect(stopScheduleModel.hasActualArrivalDate()).toBe(true);
    expect(stopScheduleModel.hasActualDepartureDate()).toBe(true);
  });

  it('should provide a date label dependent on schedule for Pickups', function() {
    expect(stopScheduleModel.getDateLabel()).toBe('Estimated Pickup');

    stopScheduleModel.setActualArrivalDate(new moment());
    expect(stopScheduleModel.getDateLabel()).toBe('Estimated Pickup');

    stopScheduleModel.setActualDepartureDate(new moment());
    expect(stopScheduleModel.getDateLabel()).toBe('Picked Up');
  });

  it('should provide a date label dependent on schedule for Pickups', function() {
    stopScheduleModel.setStopType('Delivery');

    expect(stopScheduleModel.getDateLabel()).toBe('Estimated Delivery');

    stopScheduleModel.setActualArrivalDate(new moment());
    expect(stopScheduleModel.getDateLabel()).toBe('Estimated Delivery');

    stopScheduleModel.setActualDepartureDate(new moment());
    expect(stopScheduleModel.getDateLabel()).toEqual('Delivered');
  });

  it('should identify same day appointments', function() {
    expect(stopScheduleModel.hasSameDayAppointment()).toBe(false);

    stopScheduleModel.setAppointmentEndDate(new moment());
    expect(stopScheduleModel.hasSameDayAppointment()).toBe(true);
  });

  it('should get formatted date for appt. that span multiple days', function() {
    stopScheduleModel.setAppointmentStartDate('2016-04-23T00:00:00');
    stopScheduleModel.setAppointmentEndDate('2016-04-24T00:00:00');
    expect(stopScheduleModel.getDate()).toBe('Sat Apr 23 12:00 AM - Sun Apr 24 12:00 AM');
  });

  it('should get formatted date for same day appointments', function() {
    stopScheduleModel.setAppointmentStartDate('2016-04-23T00:00:00');
    stopScheduleModel.setAppointmentEndDate('2016-04-23T00:00:00');
    expect(stopScheduleModel.getDate()).toBe('Sat Apr 23');
  });

  it('should not return time for appt. that span multiple days', function() {
    stopScheduleModel.setAppointmentStartDate('2016-04-23T00:00:00');
    stopScheduleModel.setAppointmentEndDate('2016-04-24T00:00:00');
    expect(stopScheduleModel.getTime()).toBe(undefined);
  });

  it('should get time for estimated appointment', function() {
    stopScheduleModel.setAppointmentStartDate('2016-04-23T00:00:00');
    stopScheduleModel.setAppointmentEndDate('2016-04-23T10:00:00');
    expect(stopScheduleModel.getTime()).toBe('12:00 AM - 10:00 AM');


    // only show actual on departure
    stopScheduleModel.setActualArrivalDate('2016-04-23T08:00:00');
    expect(stopScheduleModel.getTime()).toBe('12:00 AM - 10:00 AM');
  });

  it('should get time for actual appointment', function() {
    stopScheduleModel.setActualArrivalDate('2016-04-23T08:00:00');
    stopScheduleModel.setActualDepartureDate('2016-04-23T09:00:00');
    expect(stopScheduleModel.getTime()).toBe('9:00 AM');
  });

});
