'use strict';

angular.module('echo.directives.dateRangePicker', [])
  .directive('dateRangePicker', function () {
    return {
      restrict: 'E',
      scope: {
        startDate: '=',
        endDate: '='
      },
      transclude: true,
      template: '<ng-transclude></ng-transclude>',
      link: function (scope, element) {

        element.daterangepicker({
          showDropdowns: true,
          parentEl: '.datepicker',
          buttonClasses: 'btn',
          applyClass: 'btn-default',
          cancelClass: 'btn-link btn-alt',
          locale: {
            format: 'MM/DD/YYYY',
            cancelLabel: 'Clear',
            fromLabel: 'Starting',
            toLabel: 'Ending',
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

            scope.startDate = filterStartDate;
            scope.endDate = filterEndDate;
        });
      }
    };
  });
