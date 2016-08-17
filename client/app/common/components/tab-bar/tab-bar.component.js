'use strict';

angular.module('echo.components.tabBar', [])
  .component('tabBar', {
    bindings: {
      tabItems: '<',
      defaultRoute: '<',
      tabReplacementText: '<'
    },
    transclude: {
      replaceSlot: '?h2',
      searchSlot: '?searchBar'
    },
    templateUrl: 'app/common/components/tab-bar/tab-bar.template.html',
    controller: function ($state) {
      var that = this;

      that.state = $state;

      that.$onInit = function () {
        if (!_.some(that.tabItems, { link: $state.current.name }) && !that.state.current.data.hideTabBar) {
          $state.go(that.defaultRoute);
        }
      };
    }
  });