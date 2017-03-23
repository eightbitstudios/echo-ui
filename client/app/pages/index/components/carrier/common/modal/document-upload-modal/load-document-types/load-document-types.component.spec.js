describe('Component: loadDocumentTypes', function() {
  var component, $scope, store$, documentApi, documentTypeConstants,
    documents, $q, carrierId, loadId, files, refreshDocumentsCallback;

  beforeEach(function() {
    module('echo.components.modal.documentUpload.loadDocumentTypes', function($provide) {
      $provide.value('load-document-types.component.html', '');
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('documentApi', documentApi = jasmine.createSpyObj('documentApi', ['createDocuments']));
    });

    inject(function($rootScope, $componentController, _$q_, _documentTypeConstants_) {
      $scope = $rootScope.$new();
      documentTypeConstants = _documentTypeConstants_;
      $q = _$q_;

      $scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      carrierId = 3;
      store$.getState.and.returnValue({
        carrier: {
          carrierId: carrierId
        }
      });
      documents = [];
      loadId = 1234;
      files = [];
      refreshDocumentsCallback = jasmine.createSpy('refreshDocumentsCallback');

      component = $componentController('loadDocumentTypes', null, {
        documents: documents,
        loadId: loadId,
        files: files,
        refreshDocumentsCallback: refreshDocumentsCallback
      });
    });
  });

  describe('Function: $onInit', function() {
    it('should return current number of PODS', function() {
      component.$onInit();
      expect(component.numberOfPODS).toBe(1);
    });
    
    it('should return current number of PODS', function() {
      documents.push({
        documentSubType: documentTypeConstants.POD.value
      });
      component.$onInit();
      expect(component.numberOfPODS).toBe(2);
    });
  });

  describe('Function: uploadDocuments', function() {
    it('should upload POD document', function() {
      component.$onInit();
      component.selectedDocumentType = documentTypeConstants.POD.value;
      documentApi.createDocuments.and.returnValue($q.defer().promise);
      component.uploadDocuments();

      expect(documentApi.createDocuments)
        .toHaveBeenCalledWith(carrierId, loadId, 'Proof of Delivery', files);
    });

    it('should upload invoice document', function() {
      component.$onInit();
      component.selectedDocumentType = documentTypeConstants.INVOICE.value;
      documentApi.createDocuments.and.returnValue($q.defer().promise);
      component.uploadDocuments();

      expect(documentApi.createDocuments)
        .toHaveBeenCalledWith(carrierId, loadId, documentTypeConstants.INVOICE.description, files);
    });

    it('should refresh documents', function() {
      component.selectedDocumentType = documentTypeConstants.INVOICE.value;
      documentApi.createDocuments.and.returnValue($q.when());
      component.uploadDocuments();
      $scope.$digest();
      expect(refreshDocumentsCallback)
        .toHaveBeenCalled();
    });

    it('should show server error message', function() {
      var message = {
        code: 500
      };

      component.selectedDocumentType = documentTypeConstants.INVOICE.value;
      documentApi.createDocuments.and.returnValue($q.reject(message));
      component.uploadDocuments();
      $scope.$digest();
      expect(component.serverError)
        .toEqual(message);
    });
  });
});