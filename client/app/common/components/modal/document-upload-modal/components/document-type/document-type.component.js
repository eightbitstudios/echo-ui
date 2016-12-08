angular.module('echo.components.modal.documentUpload.documentType', [
  'echo.constants.documentTypes'
]).component('documentType', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/document-type/document-type.template.html',
  bindings: {
    selectedDocumentType: '=',
    isDisabled: '<'
  },
  controller: function(documentTypes) {
    var that = this;
    that.documentTypes = documentTypes;
  }
});