angular.module('echo.components.modal.documentOverview.documentPreview', [
    'echo.filters.fullName',
    'echo.models.paging',
    'echo.components.pagination',
    'echo.config.api',
    'echo.filters.documentType',
    'echo.directives.imageFallback',
    'echo.components.previewDocument',
    'echo.filters.documentType',
    'echo.components.secureImage',
    'echo.config.globals'
  ])
  .component('documentPreview', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/document-preview/document-preview.template.html',
    bindings: {
      document: '<',
      documents: '<'
    },
    controller: function($http, $window, PagingModel, apiConfig, documentApi, saveAs) {
      var that = this;

      that.printDocument = function() {
        documentApi.fetchDocument(that.document.documentName).then(function(document) {
          var printWindow = $window.open(URL.createObjectURL(document), '_blank');
          printWindow.print();
        });
      };

      that.downloadDocument = function() {
        documentApi.fetchDocument(that.document.documentName).then(function(document) {
          saveAs(document, _.template('${documentName}.pdf')({
            documentName: that.document.documentName
          }));
        });
      };

      that.$onChanges = function(changeObj) {
        if (changeObj.document.currentValue && that.paging) {
          that.paging.reset();
          that.paging.setRecords(_.size(changeObj.document.currentValue.orderedPageGuids), 1);
        }
      };

      that.$onInit = function() {
        that.paging = new PagingModel(1);
        that.apiConfig = apiConfig;
      };
    }
  });