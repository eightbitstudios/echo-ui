'use strict';

angular.module('echo.directives.echoIcon', ['echo.services.gruntIcon'])
/**
 * echoIcon directive allows gruntIconService to generate the nessesary SVGs after a page's
 * DOM elements have previously been loaded. Commonly used in all modals
 **/
  .directive('echoIcon', function (gruntIconService) {
    return {
      restrict: 'C',
      link: function (scope, element, attributes) {
        // Only call if `data-grunt-embed` attribute exists
        if (!_.isUndefined(attributes.grunticonEmbed)) {
          gruntIconService.loadSVGData();
        }
      }
    };
  });
