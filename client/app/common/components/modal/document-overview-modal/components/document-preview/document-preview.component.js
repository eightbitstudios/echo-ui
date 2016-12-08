angular.module('echo.components.modal.documentOverview.documentPreview', [
  'echo.filters.fullName'
])
  .component('documentPreview', {
    templateUrl: 'app/common/components/modal/document-overview-modal/components/document-preview/document-preview.template.html',
    bindings: {
      document: '<'
    }
  });
