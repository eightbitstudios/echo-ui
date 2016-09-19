angular.module('echo.models.paging', []).factory('PagingModel', function () {

  /**
   * @description Model for a Paging
   * @constructor
   */
  function Paging(limit) {

    var that = this;
    that.offset = 1;
    that.limit = limit;
    that.totalRecords = 0;
    that.recordCount = 0;
    that.selectedPage = 1;
  }

  Paging.prototype.nextOffset = function () {
    this.offset = this.limit + this.offset;
  };

  Paging.prototype.previousOffset = function () {
    this.offset = this.offset - this.limit;
  };

  Paging.prototype.setOffset = function (page) {
    this.offset = (page - 1) * this.limit + 1;
  };

  Paging.prototype.nextPage = function () {
    ++this.selectedPage;
    this.nextOffset();
  };

  Paging.prototype.previousPage = function () {
    --this.selectedPage;
    this.previousOffset();
  };

  Paging.prototype.setPage = function (page) {
    this.selectedPage = page;
    this.setOffset(page);
  };

  Paging.prototype.reset = function () {
    this.selectedPage = 1;
    this.offset = 1;
  };

  Paging.prototype.setRecords = function (totalRecords, recordCount) {
    this.totalRecords = totalRecords;
    this.recordCount = recordCount;
  };

  /**
   * Return the constructor function
   */
  return Paging;
});
