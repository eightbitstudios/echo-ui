'use strict';

angular.module('echo.components.filterButton', []).component('filterButton', {
  bindings: {
    buttonText: '@',
    filterEnabled: '=',
    clickHandler: '&'
  },
  templateUrl: 'app/common/components/filter-button/filter-button.template.html',
    controller: function() {
      var that = this;

      that.toggleFilter = function() {
        that.filterEnabled= !that.filterEnabled;
        that.clickHandler({value: that.filterEnabled});
      };
  }
});