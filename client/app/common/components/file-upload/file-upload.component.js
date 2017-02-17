'use strict';

angular.module('echo.components.fileUpload', [
  'echo.models.file',
  'echo.directives.dragEnter',
  'echo.directives.dragExit',
  'echo.directives.drop',
  'echo.directives.onFileChange'
]).component('fileUpload', {
  bindings: {
    files: '=',
    uploadConstraints: '<',
    error: '='
  },
  templateUrl: 'app/common/components/file-upload/file-upload.template.html',
  controller: function() {
    var that = this;

    that.dragEnter = function() {
      that.isDrag = true;
    };

    that.dragExit = function() {
      that.isDrag = false;
    };

    that.addFileHandler = function(file) {

      if (file.isValidFileType(that.uploadConstraints.documentTypes) &&
        file.isValidFileSize(that.uploadConstraints.fileSizeLimit)) {
        that.error = null;
        that.files.push(file);
      } else if (!file.isValidFileType(that.uploadConstraints.documentTypes)) {
        that.error = that.uploadConstraints.validationMessages.fileType;
      } else if (!file.isValidFileSize(that.uploadConstraints.fileSizeLimit)) {
        that.error = that.uploadConstraints.validationMessages.fileSize;
      }
    };

    that.$onInit = function() {
      that.isDrag = false;
      that.acceptedFiles = _.replace(that.uploadConstraints.documentTypes, /[\w]+\//g, ' .');
    };
  }
});