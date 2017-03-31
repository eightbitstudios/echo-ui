describe('Component: previewDocument', function() {
  var component, $scope, assetConfig, document, $q;

  beforeEach(function() {
    module('echo.components.previewDocument', function($provide) {
      $provide.value('preview-document.component.html', '');
    });

    inject(function($rootScope, $componentController, _$q_, _assetConfig_) {
      $scope = $rootScope.$new();
      assetConfig = _assetConfig_;
      $q = _$q_;

      document = jasmine.createSpyObj('document', ['isPDF', 'isPNG', 'isJPG', 'getImage']);

      $scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      component = $componentController('previewDocument', null, {
        document: document
      });
    });
  });

  describe('Function: renderPdfError', function() {
    it('should show pdf error', function(){
      component.renderPdfError();
      expect(component.pdfError).toBeTruthy();
    });
  });

  describe('Function: $onInit', function() {
    it('should show pdf fallback', function(){
      document.isPDF.and.returnValue(true);
      component.$onInit();
      expect(component.imageData).toEqual(assetConfig.PDF_FALLBACK);
    });
    
    it('should show png fallback', function(){
      document.getImage.and.returnValue($q.defer().promise);
      document.isPNG.and.returnValue(true);
      component.$onInit();
      expect(component.imageFallback).toEqual(assetConfig.PNG_FALLBACK);
    });
        
    it('should show isJPG fallback', function(){
      document.getImage.and.returnValue($q.defer().promise);
      document.isJPG.and.returnValue(true);
      component.$onInit();
      expect(component.imageFallback).toEqual(assetConfig.JPG_FALLBACK);
    });
     
    it('should fetch image data', function(){
      var image = {
        id: 1
      };

      document.getImage.and.returnValue($q.when(image));
      component.$onInit();
      $scope.$digest();
      expect(component.imageData).toEqual(image);
    });
  });
});