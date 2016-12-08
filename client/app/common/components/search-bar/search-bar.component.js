'use strict';

angular.module('echo.components.searchBar', [
  'echo.config.appConstants',
  'echo.config.keyCodes'
])
  .component('searchBar', {
    bindings: {
      searchCallback: '&'
    },
    transclude: true,
    templateUrl: 'app/common/components/search-bar/search-bar.template.html',
    controller: function (appConstants, keyCodes) {
      var that = this;

      that.maxLength = that.maxLength || 250;

      that.$onInit = function () {
        that.searchText = '';
      };

      that.toggleFocus = function () {
        that.focused = !that.focused;
      };

      that.searchHandler = function () {
        if (that.searchText.length >= appConstants.MIN_SEARCH_CHARACTERS.loads) {
          that.searchCallback({ searchText: that.searchText });
          that.searchText = '';
        }
      };

      that.searchKeyDown = function ($event) {
        if ($event.keyCode === keyCodes.ENTER) {
          that.searchHandler();
        }
      };
    }
  });