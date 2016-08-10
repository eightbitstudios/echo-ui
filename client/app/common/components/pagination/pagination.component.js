'use strict';

angular.module('echo.components.pagination', [
  'echo.filters.paging'
]).component('pagination', {
  bindings: {
    pageClickHandler: '&',
    recordType: '@',
    pagingModel: '='
  },
  templateUrl: 'app/common/components/pagination/pagination.template.html',
  controller: function () {
    var that = this;

    that.pages = [];
    that.selectedPage = 1;

    that.numberOfPages = Math.ceil(that.pagingModel.totalRecords / that.pagingModel.limit);

    for (var i = 1; i <= that.numberOfPages; i++) {
      that.pages.push(i);
    }

    that.previousPage = function () {
      if (that.pagingModel.selectedPage > 1) {
        that.pagingModel.previousPage();
        that.pageClickHandler();
      }
    };

    that.nextPage = function () {
      if (that.pagingModel.selectedPage < that.numberOfPages) {
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