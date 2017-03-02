'use strict';

angular.module('echo.components.dateTimePicker', [
    'echo.filters.datePicker'
  ])
  .component('dateTimePicker', {
    bindings: {
      dateTime: '=',
      timeZones: '<'
    },
    templateUrl: 'app/common/components/date-time-picker/date-time-picker.component.html',
    controller: function() {
      var that = this;

      that.clearDate = function($event) {
        that.dateTime.date = undefined;
        $event.stopPropagation();
      };

      that.openDatepicker = function() {
        that.isOpen = true;
      };

      that.$onInit = function() {
        that.isOpen = false;
        that.dateOptions = {
          showWeeks: false
        };
      };
    }
  });