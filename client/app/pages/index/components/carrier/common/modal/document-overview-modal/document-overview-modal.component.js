angular.module('echo.components.modal.documentOverview', [
  'echo.components.modal.documentOverview.loadDocuments',
  'echo.components.modal.documentOverview.documentPreview'
])
  .component('documentOverviewModal', {
    templateUrl: 'document-overview-modal.component.html',
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
