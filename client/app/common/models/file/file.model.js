angular.module('echo.models.file', [])
  .factory('FileModel', function($q) {

    /**
     * @constructor
     */
    function File(fileData, pageCount) {
      var that = this;

      var defaults = {
        pageCount: 1
      };

      _.assign(that, {
        fileData: fileData,
        pageCount: pageCount
      }, defaults);
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

    File.prototype.getPDFPageCount = function() {
      var that = this;

      var deferred = $q.defer();
      var reader = new FileReader();
      reader.readAsBinaryString(that.fileData);
      reader.onloadend = function() {
        that.pageCount = _.size(reader.result.match(/\/Type[\s]*\/Page[^s]/g));
        deferred.resolve(that.pageCount);
      };

      return deferred.promise;
    };

    File.prototype.getPageCount = function() {
      if (this.isPDF()) {
        return this.getPDFPageCount();
      } else {
        return $q.when(this.pageCount);
      }
    };

    /**
     * Return the constructor function
     */
    return File;
  });