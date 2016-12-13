angular.module('echo.components.modal.documentOverview', [
  'echo.components.modal.documentOverview.loadDocuments',
  'echo.components.modal.documentOverview.documentPreview'
])
  .component('documentOverviewModal', {
    templateUrl: 'app/common/components/modal/document-overview-modal/document-overview-modal.template.html',
    bindings: {
      modalActions: '<',
      documents: '<',
      selectedDocument: '<'
    },
    controller: function() {
      var that = this;

      that.selectDocument = function(selectedDocument) {
        that.selectedDocument = selectedDocument;
      };
    }
  });
