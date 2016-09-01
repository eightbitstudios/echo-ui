'use strict';

angular.module('echo.components.dateTimePicker', [
  'echo.directives.datePicker',
  'echo.filters.datePicker'
])
  .component('dateTimePicker', {
    bindings: {},
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
      var that = this;
      that.time = null;

      that.clearDate = function ($event) {
        that.date = undefined;
        $event.stopPropagation();
      };
    }
  });