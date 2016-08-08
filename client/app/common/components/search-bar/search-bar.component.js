'use strict';

angular.module('echo.components.searchBar', [])
  .component('searchBar', {
    bindings: {
      searchCallback: '&'
    },
    transclude: true,
    templateUrl: 'app/common/components/search-bar/search-bar.template.html',
    controller: function () {
      var that = this;
      
      that.searchText = '';

      that.toggleFocus = function() {
        that.focused = !that.focused;
      };

      that.searchHandler = function() {
        that.searchCallback({searchText: that.searchText});
      }
    }
  });