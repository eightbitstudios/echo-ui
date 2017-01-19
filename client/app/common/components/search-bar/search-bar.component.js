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

      this.toggleFocus = function () {
        this.focused = !this.focused;
      };

      this.searchHandler = function () {
        if (this.searchText.length >= appConstants.MIN_SEARCH_CHARACTERS.loads) {
          this.searchCallback({ searchText: this.searchText });
          this.searchText = '';
        }
      };

      this.searchKeyDown = function ($event) {
        if ($event.keyCode === keyCodes.ENTER) {
          this.searchHandler();
        }
      };

      this.$onInit = function () {
        this.searchText = '';
        this.maxLength = this.maxLength || 250;
      };
    }
  });