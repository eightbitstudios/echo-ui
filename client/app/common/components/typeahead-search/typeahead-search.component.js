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
    templateUrl: 'app/common/components/typeahead-search/typeahead-search.template.html',
    controller: function ($q) {
      var that = this;

      that.debounce = 250;
      that.typeaheadMinLength = 3;
      that.selection = null;
      that.showLoadingButton = false;
      that.numberOfSearchResults = null;
      that.isTypeaheadOpen = null;

      that.onSelect = function () {
        if (_.isObject(that.selection)) {
          that.onSelectCallback({ selection: that.selection });
          that.selection = '';
        }
      };

      that.searchServiceHandler = function (selection) {
        return that.searchService({ val: selection }).then(
          function (results) {
            that.numberOfSearchResults = _.size(results);
            return $q.when(results);
          }
        );
      };

      that.clearSearchHandler = function () {
        that.selection = '';
        that.onSelectCallback({ selection: that.selection });
      };
    }
  });