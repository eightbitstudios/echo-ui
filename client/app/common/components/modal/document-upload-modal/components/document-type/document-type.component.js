angular.module('echo.components.modal.documentUpload.documentType', [
  'echo.constants.documentTypes'
]).component('documentType', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/document-type/document-type.template.html',
  bindings: {
    documents: '<',
    selectedDocumentType: '=',
    isDisabled: '<',
    numberOfStops: '<'
  },
  controller: function(documentTypes) {
    var that = this;
    that.documentTypes = documentTypes;

    that.numberOfPODS = _(that.documents).filter(function(document) {
      return document.documentSubType === documentTypes.POD.value;
    }).size() + 1;
  }
});