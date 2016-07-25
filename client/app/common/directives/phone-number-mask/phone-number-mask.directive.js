'use strict';

angular.module('echo.directives.phoneNumberMask', [
  'echo.filters.phoneNumber'
])
  .directive('phoneNumberMask', function ($filter) {
    return {
      require: 'ngModel',
      link: function ($scope, $element, $attrs, ngModelCtrl) {

        ngModelCtrl.$parsers.push(function (viewValue) {
          var value = viewValue.replace(/[^0-9]/g, '').slice(0, 11);
          var maskedValue = $filter('phoneNumber')(value, false);
          ngModelCtrl.$setValidity('invalidFormat', maskedValue.length === 0 ||maskedValue.length === 14);
        
          ngModelCtrl.$setViewValue(maskedValue);
          ngModelCtrl.$render();

          return maskedValue;
        });

        ngModelCtrl.$render = function () {
          $element.val($filter('phoneNumber')(ngModelCtrl.$viewValue, false));
        };
      }
    };
  });