'use strict';

angular.module('echo.components.filterButton', []).component('filterButton', {
  bindings: {
    buttonText: '@',
    filterEnabled: '=',
    clickHandler: '&',
    secondaryText: '@'
  },
  templateUrl: 'app/common/components/filter-button/filter-button.component.html',
    controller: function() {
      this.toggleFilter = function() {
        this.filterEnabled= !this.filterEnabled;
        this.clickHandler({value: this.filterEnabled});
      };
  }
});