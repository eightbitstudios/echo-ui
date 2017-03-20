'use strict';

angular.module('echo.components.tabBar', [])
  .component('tabBar', {
    bindings: {
      tabItems: '<',
      tabReplacementText: '<'
    },
    transclude: {
      replaceSlot: '?h2',
      searchSlot: '?searchBar'
    },
    templateUrl: 'tab-bar.component.html',
    controller: function ($state) {
      this.$onInit = function() {
        this.state = $state;
      };
    }
  });