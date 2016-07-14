'use strict';
angular.module('echo.services.gruntIcon', ['echo.config.globals'])
  .factory('gruntIconService', function (grunticon) {
    var debouncedCall = _.debounce(function () {
      grunticon.svgLoadedCallback();
    }, 100);

    return {
      /**
       * Calls grunticon svgLoaded that injects all svg data
       * for icons with data-grunt-embeded
       *
       */
      loadSVGData: function () {
        debouncedCall();
      }
    };
  });
