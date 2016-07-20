'use strict';

angular.module('echo.components.typeaheadSearch', [])
  .component('typeaheadSearch', {
    bindings: {
      searchService: '&'
    },
    templateUrl: 'app/common/components/typeahead-search/typeahead-search.template.html',
    controller: function () {
      var that = this;

      that.debounce = 250;
      that.typeaheadMinLength = 3;

      that.onSelect = function(){
        if (_.isObject(that.selection)){
          that.onSelectCallback({selection: that.selection});
        }
      };
    }
  });