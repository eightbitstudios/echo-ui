angular.module('echo.components.modal.documentOverview.loadDocuments', [
  'echo.filters.fullName'
])
  .component('loadDocuments', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/load-documents/load-documents.template.html',
    bindings: {
      documents: '<',
      selectedDocument: '<',
      selectedDocumentCallback: '&'
    },
    controller: function() {
      var that = this;
      
      that.selectDocument = function(document) {
        that.selectedDocument = document;
        that.selectedDocumentCallback({selectedDocument: that.selectedDocument});
      };
    }
  });
