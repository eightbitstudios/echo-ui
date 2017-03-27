describe('Component: documentUpload', function() {
  var component, $scope, store$, documentApi, documentTypeConstants,
    documents, $q, carrierId, load, files, selectedDocumentType;

  beforeEach(function() {
    module('echo.components.modal.documentUpload', function($provide) {
      $provide.value('document-upload-modal.component.html', '');
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('documentApi', documentApi = jasmine.createSpyObj('documentApi', ['fetchDocuments']));
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
        loadGuid: '1234',
        pickUp: [{
          id: 1
        }]
      };
      files = [];
      selectedDocumentType = documentTypeConstants.INVOICE.value;

      component = $componentController('documentUploadModal', null, {
        documents: documents,
        load: load,
        files: files,
        selectedDocumentType: selectedDocumentType
      });
    });
  });

  describe('Function: $onInit', function() {
    it('should show selected document', function() {
      component.$onInit();
      expect(component.selectedDocumentType).toEqual(selectedDocumentType);
    });

    it('should default selected document to POD', function() {
      component.selectedDocumentType = null;
      component.$onInit();
      expect(component.selectedDocumentType).toEqual(documentTypeConstants.POD.value);
    });
  });

  describe('Function: updateDocumentNeeds', function() {
    it('should update pods needed', function() {
      component.$onInit();
      documents.push({
        documentSubType: documentTypeConstants.POD.value
      });
      component.updateDocumentNeeds();
      expect(load.neededPODs).toBe(0);
    });

    it('should update invoices needed', function() {
      component.$onInit();
      documents.push({
        documentSubType: documentTypeConstants.INVOICE.value
      });
      component.updateDocumentNeeds();
      expect(load.needsInvoice).toBeFalsy();
    });
  });

  describe('Function: resetModal', function() {
    it('should reset modal', function() {
      component.resetModal();
      expect(component.selectedDocumentType).toBe(documentTypeConstants.POD.value);
      expect(component.files.length).toBe(0);
    });
  });

  describe('Function: refreshDocuments', function() {
    it('should refresh documents', function() {
      spyOn(component, 'updateDocumentNeeds');
      spyOn(component, 'resetModal');

      documentApi.fetchDocuments.and.returnValue($q.when({}));
      component.refreshDocuments();
      $scope.$digest();

      expect(component.resetModal).toHaveBeenCalled();
      expect(component.updateDocumentNeeds).toHaveBeenCalled();
    });
  });
});