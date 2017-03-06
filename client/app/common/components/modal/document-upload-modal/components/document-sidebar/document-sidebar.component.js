angular.module('echo.components.modal.documentUpload.documentUploadSidebar', [
  'echo.filters.fullName'
])
  .component('documentUploadSidebar', {
    templateUrl: 'app/common/components/modal/document-upload-modal/components/document-sidebar/document-sidebar.component.html',
    bindings: {
      documents: '<'
    }
  });