describe('Component: fileUpload', function() {
  var component, scope, uploadConstraints, files, error;

  beforeEach(function() {
    module('echo.components.fileUpload', function($provide) {
      $provide.value('file-upload.component.html', '');
    });

    inject(function($rootScope, $compile, $componentController) {
      scope = $rootScope.$new();

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      files = [];
      error = null;
      uploadConstraints = {
        documentTypeConstants: ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png'],
        validationMessages: {
          fileType: 'fileType',
          fileSize: 'fileSize'
        }
      };

      component = $componentController('fileUpload', null, {
        uploadConstraints: uploadConstraints,
        files: files,
        error: error
      });
    });
  });

  describe('Function: $onInit', function() {
    it('should create a list of acceptable file types', function() {
      component.$onInit();
      expect(component.acceptedFiles).toEqual(' .pdf, .jpg, .jpeg, .png');
    });

    it('should set drag to false', function() {
      component.$onInit();
      expect(component.isDrag).toBeFalsy();
    });
  });

  describe('Function: dragEnter', function() {
    it('should set drag to true', function() {
      component.dragEnter();
      expect(component.isDrag).toBeTruthy();
    });
  });

  describe('Function: dragExit', function() {
    it('should set drag to false', function() {
      component.dragExit();
      expect(component.isDrag).toBeFalsy();
    });
  });

  describe('Function: addFileHandler', function() {
    it('should add a valid file', function() {
      var file = jasmine.createSpyObj('file', ['isValidFileType', 'isValidFileSize']);
      file.isValidFileType.and.returnValue(true);
      file.isValidFileSize.and.returnValue(true);
      component.addFileHandler(file);
      expect(files.length).toBe(1);
    });

    it('should show file size error', function() {
      var file = jasmine.createSpyObj('file', ['isValidFileType', 'isValidFileSize']);
      file.isValidFileType.and.returnValue(true);
      file.isValidFileSize.and.returnValue(false);
      component.addFileHandler(file);
      expect(component.error).toBe(uploadConstraints.validationMessages.fileSize);
    });

    it('should show file type error', function() {
      var file = jasmine.createSpyObj('file', ['isValidFileType', 'isValidFileSize']);
      file.isValidFileType.and.returnValue(false);
      file.isValidFileSize.and.returnValue(true);
      component.addFileHandler(file);
      expect(component.error).toBe(uploadConstraints.validationMessages.fileType);
    });
  });
});