'use strict';

angular.module('echo.components.filterBar', []).component('filterBar', {
  bindings: {
    searchList: '=',
    link: '<',
    searchParam: '=',
    minSearchCharacters: '<'
  },
  templateUrl: 'filter-bar.component.html',
  controller: function() {
    /**
     * @description Sets a search item state to selected
     * @param {Object} item - Search item that was selected
     */
    this.searchItemSelected = function(item) {

      // Set all search items to not be selected
      _.forEach(this.searchList, function(searchItem) {
        searchItem.selected = false;
      });

      item.selected = true;
      this.clearSearchHandler();
    };

    /**
     * Clears search text
     */
    this.clearSearchHandler = function() {
      this.searchParam = '';
    };

    this.$onInit = function() {
      this.searchResults = [];
      this.isSearching = false;
    };
  }
});