describe('Component: invoices', function() {
  var component, $scope, store$, documentApi, refreshDocumentsCallback,
    $q, carrierId, loadId, files, originalBillRate;

  beforeEach(function() {
    module('echo.components.modal.documentUpload.invoices', function($provide) {
      $provide.value('invoices.component.html', '');
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('documentApi', documentApi = jasmine.createSpyObj('documentApi', ['createInvoices']));
    });

    inject(function($rootScope, $componentController, _$q_) {
      $scope = $rootScope.$new();
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
      files = [];
      loadId = 1234;
      originalBillRate = 12341;
      refreshDocumentsCallback = jasmine.createSpy('refreshDocumentsCallback');

      component = $componentController('invoices', null, {
        originalBillRate: originalBillRate,
        loadId: loadId,
        files: files,
        refreshDocumentsCallback: refreshDocumentsCallback
      });
    });
  });

  describe('Function: $onInit', function() {
    it('should initialize values', function() {
      component.$onInit();
      expect(component.carrierId).toBe(carrierId);
      expect(component.newBillRate).toEqual('');
      expect(component.invoiceNumber).toEqual('');
    });
  });

  describe('Function: openDatePicker', function() {
    it('should open date picker', function() {
      component.openDatePicker();
      expect(component.isOpen).toBeTruthy();
    });
  });

  describe('Function: uploadDocuments', function() {
    it('should create invoice', function() {
      documentApi.createInvoices.and.returnValue($q.when());
      component.uploadDocuments();
      $scope.$digest();
      expect(refreshDocumentsCallback).toHaveBeenCalled();
    });

    it('should show error message if create invoice fails', function() {
      var error = {
        message: 500
      };

      documentApi.createInvoices.and.returnValue($q.reject(error));
      component.uploadDocuments();
      $scope.$digest();
      expect(component.serverError).toEqual(error);
    });
  });
});