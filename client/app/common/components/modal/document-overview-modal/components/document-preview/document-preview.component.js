angular.module('echo.components.modal.documentOverview.documentPreview', [
    'echo.filters.fullName',
    'echo.models.paging',
    'echo.components.pagination'
  ])
  .component('documentPreview', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/document-preview/document-preview.template.html',
    bindings: {
      document: '<'
    },
    controller: function(PagingModel) {
      var that = this;
      that.paging = new PagingModel(1);

      that.$onChanges = function(changeObj) {
        if (changeObj.document.currentValue) {
          that.paging.reset();
          that.paging.setRecords(_.size(changeObj.document.currentValue.loadDocumentPages), 1);
        }
      };
    }
  });