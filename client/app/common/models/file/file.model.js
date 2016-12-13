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
      return _.get(this.fileData, 'type') && this.fileData.type === 'application/pdf' || this.fileData.name.match('.pdf');
    };

    File.prototype.isValidFileType = function(validExtensionTypes) {
      var that = this;

      var extensions = _.map(validExtensionTypes, function(extension){
         return _.replace(extension, /[\w]+\//g, '.');
      });

      return _.includes(validExtensionTypes, this.fileData.type) || _.some(extensions, function(extension) {
          return that.fileData.name.match(extension);
        });
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