angular.module('echo.index.carrier.loadManagement.loadDetails.documents', [
    'echo.components.modal.documentOverview.loadDocuments',
    'echo.services.modal',
    'echo.components.loading',
    'echo.components.modal.documentOverview',
    'echo.components.modal.documentUpload',
    'echo.constants.documentTypeConstants',
    'echo.api.document'
  ])
  .component('documents', {
    templateUrl: 'documents.component.html',
    bindings: {
      load: '<'
    },
    controller: function(store$, documentApi, modalService, documentTypeConstants) {
      var that = this;

      that.openDocumentUploadModal = function(documentType) {
        return modalService.open({
          component: 'document-upload-modal',
          bindings: {
            load: that.load,
            documents: that.documents,
            selectedDocumentType: documentType || documentTypeConstants.POD.value
          }
        });
      };

      that.openInvoiceDocumentUploadModal = function() {
        var modalInstance = that.openDocumentUploadModal(documentTypeConstants.INVOICE.value);
        modalInstance.result.then(function(actionChanged) {
          if (actionChanged) {
            that.fetchDocuments();
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

      that.fetchDocuments = function() {
        that.showLoading = true;
        that.showError = false;

        documentApi.fetchDocuments(that.carrierId, that.load.loadGuid).then(function(documents) {
          that.documents = documents;
        }).catch(function() {
          that.showError = true;
        }).finally(function() {
          that.showLoading = false;
        });
      };

      that.$onInit = function() {
        var state = store$.getState();
        that.carrierId = state.carrier.carrierId;
        that.fetchDocuments();
      };
    }
  });