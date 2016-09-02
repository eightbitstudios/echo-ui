'use strict';

angular.module('echo.components.dateTimePicker', [
  'echo.directives.datePicker',
  'echo.filters.datePicker'
])
  .component('dateTimePicker', {
    bindings: {
      dateTime: '='
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
      var that = this;

      that.clearDate = function ($event) {
        that.dateTime.date = undefined;
        $event.stopPropagation();
      };
    }
  });