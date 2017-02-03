angular.module('echo.components.modal.documentUpload.loadDocumentTypes', [
  'echo.constants.documentTypes'
]).component('loadDocumentTypes', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/load-document-types/load-document-types.template.html',
  bindings: {
    selectedDocumentType: '=',
    numberOfStops: '<'
  },
  controller: function(documentTypes) {
    var that = this;

    that.$onInit = function() {
      that.documentTypes = documentTypes;
      that.numberOfPODS = _(that.documents).filter(function(document) {
        return document.documentSubType === documentTypes.POD.value;
      }).size();
    };
  }
});