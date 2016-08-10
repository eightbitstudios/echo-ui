'use strict';

angular.module('echo.components.tabBar', [])
  .component('tabBar', {
    bindings: {
      tabItems: '<',
      defaultRoute: '<'
    },
    transclude: true,
    templateUrl: 'app/common/components/tab-bar/tab-bar.template.html',
    controller: function ($state) {
      var that = this;

        if (!_.some(that.tabItems, { link: $state.current.name })) {
          $state.go(that.defaultRoute);
        }
    }
  });