'use strict';

angular.module('echo.directives.datePicker', [])
  .directive('datePicker', function () {
    return {
      restrict: 'E',
      scope: {
        date: '='
      },
      transclude: true,
      template: '<ng-transclude></ng-transclude>',
      link: function (scope, element) {

        element.daterangepicker({
          opens: 'right',
          parentEl: '.datepicker',
          buttonClasses: 'btn',
          applyClass: 'btn-default',
          timePicker: true,
          cancelClass: 'btn-link btn-alt',
          autoApply: false,
          autoUpdateInput: false,
          singleDatePicker: true,
          locale: {
            format: 'MM/DD/YYYY',
            cancelLabel: 'Clear',
            daysOfWeek: [
              'Sun',
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat'
            ]
          }
        });
        element.on('apply.daterangepicker', function (ev, picker) {
          scope.$apply(function () {
            scope.date = picker.startDate;
          });
        });
        element.on('cancel.daterangepicker', function () {
          scope.$apply(function () {
            scope.date = undefined;
          });
        });
      }
    };
  });
