'use strict';

angular.module('echo.components.tabBar', [])
  .component('tabBar', {
    bindings: {
      tabItems: '='
    },
    templateUrl: 'app/common/components/tab-bar/tab-bar.template.html',
    controller: function () {
    }
  });