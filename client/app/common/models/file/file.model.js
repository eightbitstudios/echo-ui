angular.module('echo.models.file', [
  'echo.config.globals'
]).factory('FileModel', function($q, PDFJS) {

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

  File.prototype.getPDF = function() {
    var deferred = $q.defer();

    var fileReader = new FileReader();
    fileReader.onload = function() {
      PDFJS.getDocument(fileReader.result).then(function(pdf) {
        pdf.getPage(1).then(function(page) {
          deferred.resolve(page);
        });
      }).catch(function() {
        deferred.reject();
      });
    };

    fileReader.readAsArrayBuffer(this.fileData);

    return deferred.promise;
  };

  File.prototype.getImage = function() {
    var deferred = $q.defer();

    var fileReader = new FileReader();

    fileReader.readAsDataURL(this.fileData);

    fileReader.onload = function() {
      deferred.resolve(fileReader.result);
    };

    return deferred.promise;
  };

  File.prototype.isValidFileType = function(validExtensionTypes) {
    var that = this;

    var extensions = _.map(validExtensionTypes, function(extension) {
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