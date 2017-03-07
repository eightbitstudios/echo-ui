angular.module('echo.components.modal.documentUpload.documentUploadSidebar', [
  'echo.filters.fullName'
])
  .component('documentUploadSidebar', {
    templateUrl: 'document-sidebar.component.html',
    bindings: {
      documents: '<'
    }
  });