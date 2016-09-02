'use strict';

angular.module('echo.components.dateTimePicker', [
  'echo.directives.datePicker',
  'echo.filters.datePicker'
])
  .component('dateTimePicker', {
    bindings: {
      time: '=',
      date: '=',
      timeZone: '=',
      minDate: '<'
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
      var that = this;

      that.clearDate = function ($event) {
        that.date = undefined;
        $event.stopPropagation();
      };
    }
  });