'use strict';

angular.module('echo.components.dateTimePicker', [
  'echo.directives.datePicker'
])
  .component('dateTimePicker', {
    bindings: {
      time: '='
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.template.html',
    controller: function () {
    }
  });