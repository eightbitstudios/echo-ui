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
  templateUrl: 'file-upload.component.html',
  controller: function() {
    var that = this;

    that.dragEnter = function() {
      that.isDrag = true;
    };

    that.dragExit = function() {
      that.isDrag = false;
    };

    that.addFileHandler = function(file) {

      if (file.isValidFileType(that.uploadConstraints.documentTypeConstants) &&
        file.isValidFileSize(that.uploadConstraints.fileSizeLimit)) {
        that.error = null;
        that.files.push(file);
      } else if (!file.isValidFileType(that.uploadConstraints.documentTypeConstants)) {
        that.error = that.uploadConstraints.validationMessages.fileType;
      } else {
        that.error = that.uploadConstraints.validationMessages.fileSize;
      }
    };

    that.$onInit = function() {
      that.isDrag = false;
      that.acceptedFiles = _.replace(that.uploadConstraints.documentTypeConstants, /[\w]+\//g, ' .');
    };
  }
});