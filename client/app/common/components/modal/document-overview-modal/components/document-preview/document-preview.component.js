angular.module('echo.components.modal.documentOverview.documentPreview', [
    'echo.filters.fullName',
    'echo.models.paging',
    'echo.components.pagination',
    'echo.config.api',
    'echo.filters.documentType'
  ])
  .component('documentPreview', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/document-preview/document-preview.template.html',
    bindings: {
      document: '<',

    },
    controller: function($window, PagingModel, apiConfig) {
      var that = this;
      that.paging = new PagingModel(1);
      that.apiConfig = apiConfig;

      that.$onChanges = function(changeObj) {
        if (changeObj.document.currentValue) {
          that.paging.reset();
          that.paging.setRecords(_.size(changeObj.document.currentValue.pageGuids), 1);
        }
      };
      that.printDocument = function() {

        var printWindow =
          $window.open(that.apiConfig.documentsByIdPDF({
            documentId: that.document.pageGuids[that.paging.selectedPage - 1],
            documentName: that.document.imageName + '.pdf'
          }), '_blank');

        printWindow.onload = function() {
          printWindow.print();
        };
      };
    }
  });