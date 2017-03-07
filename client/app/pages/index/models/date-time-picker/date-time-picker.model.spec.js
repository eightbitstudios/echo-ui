describe('Model: dateTimePicker', function () {
  'use strict';

  var DateTimePickerModel, momentObj, moment;

  beforeEach(function () {
    module('echo.models.dateTimePicker', function($provide) {
      $provide.constant('moment', moment = jasmine.createSpy('moment'));
    });
    inject(function (_DateTimePickerModel_) {
      DateTimePickerModel = _DateTimePickerModel_;
      moment.and.returnValue(momentObj = jasmine.createSpyObj('moment', ['set', 'subtract', 'format']));
      momentObj.subtract.and.returnValue(momentObj);
    });
  });

  describe('Function: getDateTime', function() {
    it('should return date time', function() {
      var time = '12:23',
      date = '09/25/2016';
      var dateTime = new DateTimePickerModel({
        time: time,
        date: date
      });

      momentObj.set.and.returnValue(date + ' ' + time);
      expect(dateTime.getDateTime()).toEqual(date + ' ' + time);
    });
  });
});
