'use strict';

angular.module('echo.components.typeaheadSearch', [
  'echo.filters.phoneNumber'
]).component('typeaheadSearch', {
  bindings: {
    searchService: '&',
    onSelectCallback: '&',
    template: '@',
    placeholderText: '@',
    darkTheme: '<'
  },
  templateUrl: 'typeahead-search.component.html',
  controller: function($q) {

    this.onSelect = function() {
      if (_.isObject(this.selection)) {
        this.onSelectCallback({
          selection: this.selection
        });
        this.selection = '';
      }
    };

    this.searchServiceHandler = function(selection) {
      var that = this;

      return that.searchService({
        val: selection
      }).then(
        function(results) {
          that.numberOfSearchResults = _.size(results);
          return $q.when(results);
        }
      );
    };

    this.clearSearchHandler = function() {
      this.selection = '';
      this.onSelectCallback({
        selection: this.selection
      });
    };

    this.$onInit = function() {
      this.maxLength = this.maxLength || 250;
      this.debounce = 250;
      this.typeaheadMinLength = 3;
      this.selection = null;
      this.showLoadingButton = false;
      this.numberOfSearchResults = null;
      this.isTypeaheadOpen = null;
    };
  }
});