describe('Component: loadDocumentTypes', function() {
  var component, $scope, store$, documentApi, documentTypeConstants,
    documents, $q, carrierId, load, files, refreshDocumentsCallback;

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
      load = {
        loadNumber: 1234
      };

      files = [];
      refreshDocumentsCallback = jasmine.createSpy('refreshDocumentsCallback');

      component = $componentController('loadDocumentTypes', null, {
        documents: documents,
        load: load,
        files: files,
        refreshDocumentsCallback: refreshDocumentsCallback
      });
    });
  });

  describe('Function: uploadDocuments', function() {
    it('should upload POD document', function() {
      component.$onInit();
      component.selectedDocumentType = documentTypeConstants.POD.value;
      documentApi.createDocuments.and.returnValue($q.defer().promise);
      component.uploadDocuments();

      expect(documentApi.createDocuments)
        .toHaveBeenCalledWith(carrierId, load.loadNumber, 'Proof of Delivery', files);
    });

    it('should upload invoice document', function() {
      component.$onInit();
      component.selectedDocumentType = documentTypeConstants.INVOICE.value;
      documentApi.createDocuments.and.returnValue($q.defer().promise);
      component.uploadDocuments();

      expect(documentApi.createDocuments)
        .toHaveBeenCalledWith(carrierId, load.loadNumber, documentTypeConstants.INVOICE.description, files);
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
      var serverError = {
        code: 500
      };

      component.selectedDocumentType = documentTypeConstants.INVOICE.value;
      documentApi.createDocuments.and.returnValue($q.reject(message));
      component.uploadDocuments();
      $scope.$digest();
      expect(component.serverError)
        .toEqual(serverError.code);
    });
  });
});