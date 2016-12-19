angular.module('echo.components.modal.documentOverview.loadDocuments', [
  'echo.filters.fullName',
  'echo.config.api',
  'echo.filters.documentType',
  'echo.components.secureImage'
])
  .component('loadDocuments', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/load-documents/load-documents.template.html',
    bindings: {
      documents: '<',
      selectedDocument: '<',
      selectedDocumentCallback: '&',
      hidePreview: '<'
    },
    controller: function(apiConfig) {
      var that = this;
      that.apiConfig = apiConfig;
      that.selectDocument = function(document) {
        that.selectedDocument = document;
        that.selectedDocumentCallback({selectedDocument: that.selectedDocument});
      };
    }
  });
