angular.module('echo.components.modal.documentUpload.documentType', [
  'echo.constants.documentTypeConstants'
]).component('documentType', {
  templateUrl: 'document-type.component.html',
  bindings: {
    documents: '<',
    selectedDocumentType: '=',
    isDisabled: '<',
    numberOfStops: '<'
  },
  transclude: {
    invoices: 'invoices',
    loadDocumentTypes: 'loadDocumentTypes'
  },
  controller: function(documentTypeConstants) {
    var that = this;

    that.loadDocumentsHandler = function() {
      if (that.selectedDocumentType === null) {
        that.selectedDocumentType = documentTypeConstants.POD.value; // Default to POD
      }
      return that.selectedDocumentType === documentTypeConstants.INVOICE.value ? null : that.selectedDocumentType;
    };

    that.$onInit = function() {

      that.documentTypeConstants = documentTypeConstants;
      that.numberOfPODS = _(that.documents).filter(function(document) {
        return document.documentSubType === documentTypeConstants.POD.value;
      }).size();
    };
  }
});