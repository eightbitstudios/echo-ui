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
    templateUrl: 'app/common/components/tab-bar/tab-bar.template.html',
    controller: function ($state) {
      this.$onInit = function() {
        this.state = $state;
      };
    }
  });