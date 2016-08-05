'use strict';

angular.module('echo.filters.paging', [])
  .filter('paging', function () {
    return function (pagingModel, recordType) {
      var lastRecord = pagingModel.offset + pagingModel.recordCount - 1;
      var template = _.template('Showing ${firstRecord}-${lastRecord} of ${totalRecords} ${recordType}')
      return template({
        firstRecord: pagingModel.offset,
        lastRecord: lastRecord,
        totalRecords: pagingModel.totalRecords,
        recordType: recordType
      });
    };
  });