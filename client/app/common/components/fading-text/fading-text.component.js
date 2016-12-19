'use strict';

angular.module('echo.components.fadingText', [])
  .component('fadingText', {
    bindings: {
      text: '@'
    },
    templateUrl: 'app/common/components/fading-text/fading-text.template.html'
  });