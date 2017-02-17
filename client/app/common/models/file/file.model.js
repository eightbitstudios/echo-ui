angular.module('echo.models.file', [
  'echo.config.globals'
]).constant('fileTypes', {
  JPG: {
    type: 'image/jpg',
    extension: '.jpg'
  },
  PNG: {
    type: 'image/png',
    extension: '.png'
  },
  PDF: {
    type: 'application/pdf',
    extension: '.pdf'
  }
}).factory('FileModel', function($q, PDFJS, fileTypes) {

  /**
   * @constructor
   */
  function File(fileData) {
    var that = this;

    _.assign(that, {
      fileData: fileData
    });
  }

  File.prototype.isJPG = function() {
    return this.fileData.type === fileTypes.JPG.type || this.fileData.name.match(fileTypes.JPG.extension);
  };

  File.prototype.isPNG = function() {
    return this.fileData.type === fileTypes.PNG.type || this.fileData.name.match(fileTypes.PNG.extension);
  };

  File.prototype.isPDF = function() {
    return this.fileData.type === fileTypes.PDF.type || this.fileData.name.match(fileTypes.PDF.extension);
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