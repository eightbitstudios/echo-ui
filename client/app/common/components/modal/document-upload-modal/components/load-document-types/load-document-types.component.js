angular.module('echo.components.modal.documentUpload.loadDocumentTypes', [
  'echo.constants.documentTypes',
  'echo.api.document'
]).component('loadDocumentTypes', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/load-document-types/load-document-types.component.html',
  bindings: {
    loadId: '<',
    selectedDocumentType: '=',
    numberOfStops: '<',
    documents: '<',
    files: '<',
    refreshDocumentsCallback: '&'
  },
  controller: function(store$, documentTypes, documentApi) {
    var that = this;

    that.uploadDocuments = function() {
      that.showLoading = true;
      that.showSavedMessage = false;
      that.showErrorMessage = false;

      var podDescription = null;

      var documentType = _.find(documentTypes, function(documentType) {
        return documentType.value === that.selectedDocumentType;
      });

      if(_.isFunction(documentType.description)) {
        podDescription = _.trim(_.replace(documentType.description({
          documentNumber: ''
        }), '#', ''));
      }

      documentApi.createDocuments(that.carrierId, that.loadId, podDescription || documentType.description, that.files)
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
      that.carrierId = store$.getState().carrier.carrierId;
      that.documentTypes = documentTypes;
      that.numberOfPODS = _(that.documents).filter(function(document) {
        return _.parseInt(document.documentSubType, 10) === documentTypes.POD.value;
      }).size() + 1;
    };
  }
});