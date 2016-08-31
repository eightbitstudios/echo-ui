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
          parentEl: '.datepicker',
          opens: 'right',
          buttonClasses: 'btn',
          applyClass: 'btn-default',
          cancelClass: 'btn-link btn-alt',
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
          var filterStartDate = picker.startDate,
            filterEndDate = picker.endDate;
          scope.$apply(function () {
            scope.startDate = filterStartDate;
            scope.endDate = filterEndDate;
          });
        });
        element.on('cancel.daterangepicker', function () {
          scope.$apply(function () {
            scope.startDate = null;
            scope.endDate = null;
          });
        });
      }
    };
  });
