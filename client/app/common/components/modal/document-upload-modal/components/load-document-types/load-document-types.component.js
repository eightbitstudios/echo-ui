angular.module('echo.components.modal.documentUpload.loadDocumentTypes', [
  'echo.constants.documentTypes',
  'echo.api.document'
]).component('loadDocumentTypes', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/load-document-types/load-document-types.template.html',
  bindings: {
    loadId: '<',
    selectedDocumentType: '=',
    numberOfStops: '<',
    documents: '<',
    files: '<',
    refreshDocumentsCallback: '&'
  },
  controller: function(documentTypes, documentApi) {
    var that = this;

      that.uploadDocuments = function() {
        that.showLoading = true;
        that.showSavedMessage = false;
        that.showErrorMessage = false;

        documentApi.createDocuments(that.loadId, that.selectedDocumentType, that.files)
          .then(function() {
            that.showSavedMessage = true;
            that.refreshDocumentsCallback();
          }).catch(function(message) {
            that.showErrorMessage = true;
            that.serverError = message;
          }).finally(function() {
            that.showLoading = false;
          });
      };

    that.$onInit = function() {
      that.documentTypes = documentTypes;
      that.numberOfPODS = _(that.documents).filter(function(document) {
        return document.documentSubType === documentTypes.POD.value;
      }).size();
    };
  }
});