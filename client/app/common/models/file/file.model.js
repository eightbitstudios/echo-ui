angular.module('echo.models.file', [])
  .factory('FileModel', function() {

    /**
     * @constructor
     */
    function File(fileData) {
      var that = this;

      _.assign(that, {
        fileData: fileData
      });
    }

    File.prototype.isPDF = function() {
      return _.get(this.fileData, 'type') === 'application/pdf';
    };

    File.prototype.isValidFileType = function(validExtensionTypes) {
      return _.get(this.fileData, 'type') &&
        _.includes(validExtensionTypes, this.fileData.type);
    };

    File.prototype.isValidFileSize = function(sizeLimit) {
      return _.get(this.fileData, 'size') &&
        this.fileData.size <= sizeLimit;
    };

    /**
     * Return the constructor function
     */
    return File;
  });