describe('Model: Paging', function () {
  'use strict';

  var PagingModel,
    limit = 10;

  beforeEach(function () {
    module('echo.models.paging');
    inject(function (_PagingModel_) {
      PagingModel = _PagingModel_;
    });
  });

  describe('Function: nextOffset', function() {
    it('should calculate the next offset', function() {
      var paging = new PagingModel(limit);
      paging.nextOffset();
      expect(paging.offset).toBe(11);
    });
  });

  describe('Function: previousOffset', function() {
    it('should calculate the previous offset', function() {
      var paging = new PagingModel(limit);
      paging.offset = 11;
      paging.previousOffset();
      expect(paging.offset).toBe(1);
    });
  });

  describe('Function: setOffset', function() {
    it('should calculate the offset based on page number', function() {
      var paging = new PagingModel(limit);
      paging.setOffset(3);
      expect(paging.offset).toBe(21);
    });
  });

  describe('Function: nextPage', function() {
    it('should calculate the offset and next page', function() {
      var paging = new PagingModel(limit);
      paging.nextPage();
      expect(paging.offset).toBe(11);
      expect(paging.selectedPage).toBe(2);
    });
  });

  describe('Function: previousPage', function() {
    it('should calculate the offset and next page', function() {
      var paging = new PagingModel(limit);
      paging.nextPage();
      paging.previousPage();

      expect(paging.offset).toBe(1);
      expect(paging.selectedPage).toBe(1);
    });
  });

  describe('Function: setPage', function() {
    it('should calculate the offset and next page', function() {
      var paging = new PagingModel(limit);
      paging.setPage(4);
      expect(paging.offset).toBe(31);
      expect(paging.selectedPage).toBe(4);
    });
  });

  describe('Function: reset', function() {
    it('should set selected page and offset to 1', function() {
      var paging = new PagingModel(limit);
      paging.reset();
      expect(paging.selectedPage).toBe(1);
      expect(paging.offset).toBe(1);
    });
  });

  describe('Function: setRecords', function() {
    it('should set total records and record count', function() {
      var totalRecords = 10,
        recordCount = 5;

      var paging = new PagingModel(limit);
      paging.setRecords(totalRecords, recordCount);
      expect(paging.totalRecords).toBe(totalRecords);
      expect(paging.recordCount).toBe(recordCount);
    });
  });
});
