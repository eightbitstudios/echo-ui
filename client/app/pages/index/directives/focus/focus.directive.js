angular.module('echo.directives.focus', [])
  .directive('focus', function () {
    return {
      restrict: 'A',
      link: function (scope, element) {
        element[0].focus();
      }
    };
  });
