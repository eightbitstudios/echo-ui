angular.module('echo.components.modal.documentUpload.documentType', [
  'echo.constants.documentTypes'
]).component('documentType', {
  templateUrl: 'app/common/components/modal/document-upload-modal/components/document-type/document-type.template.html',
  bindings: {
    documents: '<',
    selectedDocumentType: '=',
    isDisabled: '<',
    numberOfStops: '<',
    invoiceDate: '=',
    originalBillRate: '<',
    newBillRate: '=',
    invoiceNumber: '='
  },
  controller: function(documentTypes) {
    var that = this;

    that.loadDocumentsHandler = function() {
      if (that.selectedDocumentType === null) {
        that.selectedDocumentType = documentTypes.POD.value; // Default to POD
      }
      return that.selectedDocumentType === documentTypes.INVOICE.value ? null : that.selectedDocumentType;
    };

    that.openDatePicker = function() {
      that.isOpen = true;
    };

    that.$onInit = function() {
      that.isOpen = false;
      that.documentTypes = documentTypes;
      that.numberOfPODS = _(that.documents).filter(function(document) {
        return document.documentSubType === documentTypes.POD.value;
      }).size();

      if(that.numberOfPODS < that.numberOfStops) {
        that.selectedDocumentType = that.documentTypes.POD.value;
      }

      that.dateOptions = {
        showWeeks: false,
        initDate: new Date()
      };

    };
  }
});