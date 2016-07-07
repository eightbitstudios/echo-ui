'use strict';

angular.module('echo.components.header', [
  'echo.components.eyeBrowNav',
  'echo.components.carrierNav'
]).component('appHeader', {
  templateUrl: 'app/common/components/header/header.template.html'
});