'use strict';

angular.module('echo.components.showMore', [
    'echo.filters.showMore'
  ])
  .component('showMore', {
    bindings: {
      clickHandler: '&',
      recordType: '@',
      pagingModel: '=',
      showLoading: '<'
    },
    templateUrl: 'app/common/components/show-more/show-more.component.html',
    controller: function() {

      this.showMoreHandler = function() {
        this.pagingModel.nextOffset();
        this.clickHandler();
      };

      this.$onInit = function() {
        this.firstRecord = 1;
      };
    }
  });