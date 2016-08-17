'use strict';

angular.module('echo.components.showMore', [
  'echo.filters.showMore'
])
  .component('showMore', {
    bindings: {
      clickHandler: '&',
      recordType: '@',
      pagingModel: '='
    },
    templateUrl: 'app/common/components/show-more/show-more.template.html',
    controller: function () {
      var that = this;

      that.firstRecord = 0;

      that.showMoreHandler = function (){
        that.pagingModel.nextOffset();
        that.clickHandler();
      };
    }
  });