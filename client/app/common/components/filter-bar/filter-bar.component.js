'use strict';

angular.module('echo.components.filterBar', [
]).component('filterBar', {
  bindings: {
    searchList: '=',
    link: '<',
    searchParam: '=',
    minSearchCharacters: '<'
  },
  templateUrl: 'app/common/components/filter-bar/filter-bar.template.html',
  controller: function () {
    var that = this;

    that.searchResults = [];
    that.isSearching = false;

    /**
     * @description Sets a search item state to selected
     * @param {Object} item - Search item that was selected
     */
    that.searchItemSelected = function(item) {

      // Set all search items to not be selected
      _.forEach(that.searchList, function(searchItem){
        searchItem.selected = false;
      });

      item.selected = true;
      this.clearSearchHandler();
    };

    /**
     * Clears search text
     */
    that.clearSearchHandler = function() {
      that.searchParam = '';
    };
  }
});