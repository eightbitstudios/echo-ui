describe('Model: file', function() {
  'use strict';

  var FileModel, PDFJS, fileTypes, $q, $scope;

  beforeEach(function() {
    module('echo.models.file', function($provide) {
      $provide.constant('PDFJS', PDFJS = jasmine.createSpyObj('PDFJS', ['getDocument']));
    });
    inject(function($rootScope, _FileModel_, _fileTypes_, _$q_) {
      $scope = $rootScope.$new();
      FileModel = _FileModel_;
      fileTypes = _fileTypes_;
      $q = _$q_;
    });
  });

  describe('Function: isJPG', function() {
    it('should be a jpg file if the file type matches', function() {
      var file = new FileModel({
        type: fileTypes.JPG.type
      });

      expect(file.isJPG()).toBeTruthy();
    });

    it('should be a jpg file if the file extension matches', function() {
      var file = new FileModel({
        name: 'test' + fileTypes.JPG.extension
      });

      expect(file.isJPG()).toBeTruthy();
    });

    it('should not be a jpeg if the file type doesnt match', function() {
      var file = new FileModel({
        type: fileTypes.PNG.type,
        name: 'test' + fileTypes.PNG.extension
      });

      expect(file.isJPG()).toBeFalsy();
    });
  });

  describe('Function: isPNG', function() {
    it('should be a png file if the file type matches', function() {
      var file = new FileModel({
        type: fileTypes.PNG.type
      });

      expect(file.isPNG()).toBeTruthy();
    });

    it('should be a png file if the file extension matches', function() {
      var file = new FileModel({
        name: 'test' + fileTypes.PNG.extension
      });

      expect(file.isPNG()).toBeTruthy();
    });

    it('should not be a png if the file type doesnt match', function() {
      var file = new FileModel({
        type: fileTypes.JPG.type,
        name: 'test' + fileTypes.JPG.extension
      });

      expect(file.isPNG()).toBeFalsy();
    });
  });

  describe('Function: isPDF', function() {
    it('should be a pdf file if the file type matches', function() {
      var file = new FileModel({
        type: fileTypes.PDF.type
      });

      expect(file.isPDF()).toBeTruthy();
    });

    it('should be a pdf file if the file extension matches', function() {
      var file = new FileModel({
        name: 'test' + fileTypes.PDF.extension
      });

      expect(file.isPDF()).toBeTruthy();
    });

    it('should not be a pdf if the file type doesnt match', function() {
      var file = new FileModel({
        type: fileTypes.JPG.type,
        name: 'test' + fileTypes.JPG.extension
      });

      expect(file.isPDF()).toBeFalsy();
    });
  });

  describe('Function: getPDF', function() {
    var file,
      fileReader,
      page;

    beforeEach(function() {
      file = new FileModel({
        type: fileTypes.PDF.type
      });
      page = {
        pageId: 2
      };

      spyOn(window, 'FileReader').and.returnValue(
        fileReader = jasmine.createSpyObj('FileReader', ['readAsArrayBuffer']));
      fileReader.result = {};
    });

    it('should get first page of PDF', function(done) {
      var pdf = jasmine.createSpyObj('pdf', ['getPage']);

      pdf.getPage.and.returnValue($q.when(page));
      PDFJS.getDocument.and.returnValue($q.when(pdf));

      file.getPDF().then(function(pageData) {
        expect(page).toEqual(pageData);
        done();
      });

      fileReader.onload();

      $scope.$digest();
    });

    it('should fail if PDF is corrupt', function(done) {

      PDFJS.getDocument.and.returnValue($q.reject());

      file.getPDF().catch(function() {
        expect(PDFJS.getDocument).toHaveBeenCalled();
        done();
      });

      fileReader.onload();

      $scope.$digest();
    });
  });

  describe('Function: getImage', function() {
    var file,
      fileReader;

    beforeEach(function() {
      file = new FileModel({
        type: fileTypes.PDF.type
      });

      spyOn(window, 'FileReader').and.returnValue(
        fileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL']));
      fileReader.result = {};
    });

    it('should get image data', function(done) {

      file.getImage().then(function(pageData) {
        expect(fileReader.result).toEqual(pageData);
        done();
      });

      fileReader.onload();

      $scope.$digest();
    });
  });

  describe('Function: isValidFileType', function() {
    it('should allow empty valid extension types', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type,
          name: 'test' + fileTypes.PDF.extension
        }),
        validFileTypes = null;

      expect(file.isValidFileType(validFileTypes)).toBeFalsy();
    });

    it('should be a valid file type', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type,
          name: 'test' + fileTypes.PDF.extension
        }),
        validFileTypes = [fileTypes.PDF.type];

      expect(file.isValidFileType(validFileTypes)).toBeTruthy();
    });

    it('should not be a valid file type', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type,
          name: 'test' + fileTypes.PDF.extension
        }),
        validFileTypes = [fileTypes.JPG.type];

      expect(file.isValidFileType(validFileTypes)).toBeFalsy();
    });
  });

  describe('Function: isValidFileSize', function() {
    it('should be a valid file size', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type,
          size: 10
        }),
        sizeLimit = 12;

      expect(file.isValidFileSize(sizeLimit)).toBeTruthy();
    });

    it('should not be a valid file size', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type,
          size: 10
        }),
        sizeLimit = 8;

      expect(file.isValidFileSize(sizeLimit)).toBeFalsy();
    });

    it('should fail if a file has no size', function() {
      var file = new FileModel({
          type: fileTypes.PDF.type
        }),
        sizeLimit = 8;

      expect(file.isValidFileSize(sizeLimit)).toBeFalsy();
    });
  });
});