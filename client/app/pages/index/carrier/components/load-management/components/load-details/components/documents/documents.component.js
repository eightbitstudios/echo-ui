angular.module('echo.index.carrier.loadManagement.loadDetails.documents', [
    'echo.components.modal.documentOverview.loadDocuments',
    'echo.services.modal',
    'echo.components.modal.documentOverview',
    'echo.components.modal.documentUpload'
  ])
  .component('documents', {
    templateUrl: 'app/pages/index/carrier/components/load-management/components/load-details/components/documents/documents.template.html',
    bindings: {
      load: '<',
      documents: '<'
    },
    controller: function(modalService) {
      var that = this;

      that.openDocumentUploadModal = function() {
        return modalService.open({
          component: 'document-upload-modal',
          bindings: {
            load: that.load,
            documents: that.documents
          }
        });
      };

      that.openDocumentOverviewModal = function(selectedDocument) {
        return modalService.open({
          component: 'document-overview-modal',
          windowTopClass: 'transparent',
          openedClass: 'dark modal-open',
          bindings: {
            documents: that.documents,
            selectedDocument: selectedDocument
          }
        });
      };
    }
  });