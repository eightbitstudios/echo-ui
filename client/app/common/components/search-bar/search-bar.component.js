'use strict';

angular.module('echo.components.searchBar', [])
  .component('searchBar', {
    bindings: {
      searchText: '='
    },
    transclude: true,
    templateUrl: 'app/common/components/search-bar/search-bar.template.html',
    controller: function () {
      var that = this;

      that.toggleFocus = function() {
        that.focused = !that.focused;
      };
    }
  });