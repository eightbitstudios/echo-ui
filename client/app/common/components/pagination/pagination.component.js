'use strict';

angular.module('echo.components.pagination', []).component('pagination', {
  bindings: {
    numberOfPages: '<',
    pageClickHandler: '&'
  },
  templateUrl: 'app/common/components/pagination/pagination.template.html',
  controller: function () {
    var that = this;

    that.pages = [];
    that.selectedPage = 1;

    that.createPages = function () {
      for (var i = 1; i <= that.numberOfPages; i++) {
        that.pages.push(i);
      }
    };

    that.previousPage = function () {
      if (that.selectedPage > 1) {
        --that.selectedPage;
        that.pageClickHandler({ page: that.selectedPage });
      }
    };

    that.nextPage = function () {
      if (that.selectedPage < that.numberOfPages) {
        ++that.selectedPage;
        that.pageClickHandler({ page: that.selectedPage });
      }
    };

    that.pageClick = function (page) {
      that.selectedPage = page;

      that.pageClickHandler({ page: page });
    };

    that.$onChanges = that.createPages;
  }
});