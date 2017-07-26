angular.module('echo.components.modal.documentOverview.loadDocuments', [
    'echo.filters.fullName',
    'echo.config.api',
    'echo.filters.documentType',
    'echo.components.secureImage'
  ])
  .component('loadDocuments', {
    templateUrl: 'load-documents.component.html',
    bindings: {
      documents: '<',
      selectedDocument: '<',
      selectedDocumentCallback: '&',
      hidePreview: '<'
    },
    controller: function(apiConfig) {
      var that = this;
      that.selectDocument = function(document) {
        that.selectedDocument = document;
        that.selectedDocumentCallback({
          selectedDocument: that.selectedDocument
        });
      };

      that.$onInit = function() {
        that.apiConfig = apiConfig;
      };
    }
  });