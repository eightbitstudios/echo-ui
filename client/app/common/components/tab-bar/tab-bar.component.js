'use strict';

angular.module('echo.components.tabBar', [])
  .component('tabBar', {
    bindings: {
      tabItems: '<',
      defaultRoute: '<',
      hideOnRoutes: '<',
      tabReplacementText: '<'
    },
    transclude: {
      replaceSlot: '?h2',
      searchSlot: 'searchBar'
    },
    templateUrl: 'app/common/components/tab-bar/tab-bar.template.html',
    controller: function ($state) {
      var that = this;

      that.isTabBarVisible = function () {
        return !_.includes(that.hideOnRoutes, $state.current.name);
      };

      that.$onInit = function () {
        if (!_.some(that.tabItems, { link: $state.current.name }) && that.isTabBarVisible()) {
          $state.go(that.defaultRoute);
        }
      };
    }
  });