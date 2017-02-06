angular.module('echo.directives.currency', [])
  .directive('currency', function() {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, element) {

          element.on('blur', function() {
              var value = element.val();
              var formattedValue = '';
              if (!_.isEmpty(_.trim(value))) {
                var cleanedValue = _.trim(_.replace(value, /\D/g, ''));
                if (!_.isEmpty(cleanedValue)) {
                  formattedValue = '$' + _.replace(cleanedValue, /\B(?=(\d{3})+(?!\d))/g, ',');
                }
                element.val(formattedValue);
                }
              });

            element.on('focus', function() {
              var value = element.val();
              if (!_.isEmpty(_.trim(value))) {
                element.val(_.replace(value, /\D/g, ''));
              }
            });
          }
        };
      });