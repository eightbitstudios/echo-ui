'use strict';

angular.module('echo.components.successfulText', [])
  .component('successfulText', {
    bindings: {
      text: '@'
    },
    templateUrl: 'app/common/components/successful-text/successful-text.template.html'
  });