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
  templateUrl: 'app/common/components/pagination/pagination.component.html',
  controller: function() {

    this.previousPage = function() {
      if (this.pagingModel.selectedPage > 1) {
        this.pagingModel.previousPage();
        this.pageClickHandler();
      }
    };

    this.nextPage = function() {
      if (this.pagingModel.selectedPage < this.numberOfPages) {
        this.pagingModel.nextPage();
        this.pageClickHandler();
      }
    };

    this.pageClick = function(page) {
      this.pagingModel.setPage(page);
      this.pageClickHandler();
    };

    this.$onInit = function() {
      this.pages = [];
      this.selectedPage = 1;

      this.numberOfPages = Math.ceil(this.pagingModel.totalRecords / this.pagingModel.limit);

      for (var i = 1; i <= this.numberOfPages; i++) {
        this.pages.push(i);
      }
    };
  }
});
