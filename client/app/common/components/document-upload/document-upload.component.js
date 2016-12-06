angular.module('echo.components.documentUpload', [
  'echo.directives.fileUpload'
])
  .component('documentUpload', {
    templateUrl: 'app/common/components/document-upload/document-upload.template.html',
    bindings: {
      files: '='
    },
    controller: function () {
      var that = this;

      that.removeFile = function(file){
        _.remove(that.files, file);
      };
    }
  });