'use strict';

angular.module('echo.components.searchBar', [
]).component('searchBar', {
  bindings: {
    searchList: '='
  },
  transclude: true,
  templateUrl: 'app/common/components/search-bar/search-bar.template.html',
  controller: function () {
    this.searchText = '';
    this.searchResults = [];
  }
});