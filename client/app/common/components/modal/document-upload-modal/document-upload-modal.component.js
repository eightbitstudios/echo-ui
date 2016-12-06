angular.module('echo.components.modal.documentUpload', [
  'echo.components.radioButton',
  'echo.components.documentUpload',
  'echo.components.documentTypes'
])
  .component('documentUploadModal', {
    templateUrl: 'app/common/components/modal/document-upload-modal/document-upload-modal.template.html',
    bindings: {
      load: '=',
      modalActions: '<',
    },
    controller: function (documentTypes) {
      var that = this;

      that.files = [];
      that.documentTypes = documentTypes;
      that.selectedDocumentType = documentTypes.POD;
    }
  });
