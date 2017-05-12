angular.module('echo.models.dateTimePicker', [
  'echo.config.globals'
])
  .factory('DateTimePickerModel', function (moment) {

    /**
     * @constructor
     */
    function DateTimePicker(data) {
      var that = this;
      
      var defaults = {
        date: undefined,
        timeZone: 'CT',
        time: moment().subtract(2, 'm').format('HHmm')
      };

      _.assign(that, defaults, data);
    }

    DateTimePicker.prototype.getDateTime = function () {
      var timeArray = _.split(this.time, '');
      var hours = _.parseInt(_.nth(timeArray, 0) + _.nth(timeArray, 1)),
        minutes = _.parseInt(_.nth(timeArray, 2) + _.nth(timeArray, 3));
      return moment(this.date).set({ hour: hours, minute: minutes, second: 0, millisecond: 0 });	// today for undefined. We want to return today if the date isn't set.
    };

    /**
     * Return the constructor function
     */
    return DateTimePicker;
  });
