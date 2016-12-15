'use strict';

angular.module('echo.directives.secureSrc', [])
  .directive('secureSrc', function($http) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var requestConfig = {
          responseType: 'arraybuffer',
          cache: 'true'
        };

        $http.get(attrs.secureSrc, requestConfig)
          .success(function(data) {
            var arr = new Uint8Array(data);

            var raw = '';
            var i, j, subArray, chunk = 5000;
            for (i = 0, j = arr.length; i < j; i += chunk) {
              subArray = arr.subarray(i, i + chunk);
              raw += String.fromCharCode.apply(null, subArray);
            }

            var b64 = btoa(raw);

            attrs.$set('src', 'data:image/jpeg;base64,' + b64);
          });
      }
    };
  });