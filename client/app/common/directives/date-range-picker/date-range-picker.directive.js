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
          scope.$apply(function () {
            scope.startDate = filterStartDate;
            scope.endDate = filterEndDate;
          });
        });

        var init = false;
        element.on('show.daterangepicker', function (env, picker) {
          if (!init) {
            picker.container.prepend(angular.element('<header class="filter-header">View Available Drivers Between</header>'));
            picker.container.find('[name="daterangepicker_start"]').before(angular.element('<label for="daterangepicker_start">Starting</label>'));
            picker.container.find('[name="daterangepicker_end"]').before(angular.element('<label for="daterangepicker_end">Ending</label>'));
            init = true;
          }
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
