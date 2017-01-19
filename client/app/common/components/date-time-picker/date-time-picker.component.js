'use strict';

angular.module('echo.components.dateTimePicker', [
  'echo.directives.datePicker',
  'echo.filters.datePicker'
])
  .component('dateTimePicker', {
    bindings: {
      dateTime: '=',
      timeZones: '<'
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
      this.clearDate = function ($event) {
        this.dateTime.date = undefined;
        $event.stopPropagation();
      };
    }
  });