'use strict';

angular.module('echo.components.pagination', [
  'echo.filters.paging'
]).component('pagination', {
  bindings: {
    pageClickHandler: '&',
    recordType: '@',
    pagingModel: '=',
    onlyShowCurrentPage: '<'
  },
  templateUrl: 'app/common/components/pagination/pagination.template.html',
  controller: function () {
    var that = this;

    that.selectedPage = 1;

    that.previousPage = function () {
      if (that.pagingModel.selectedPage > 1) {
        that.pagingModel.previousPage();
        that.pageClickHandler();
      }
    };

    that.nextPage = function () {
      if (that.pagingModel.selectedPage < that.pagingModel.getNumberOfPages()) {
        that.pagingModel.nextPage();
        that.pageClickHandler();
      }
    };

    that.pageClick = function (page) {
      that.pagingModel.setPage(page);
      that.pageClickHandler();
    };
  }
});