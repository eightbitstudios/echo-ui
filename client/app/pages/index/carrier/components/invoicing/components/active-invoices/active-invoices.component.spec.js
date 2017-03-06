describe('Component: Invoicing', function() {
  var $q, component, scope, invoiceEnums, invoiceCountsActionCreator,
    store$, PagingModel, invoicesApi, carrierId, paging, state;

  beforeEach(function() {
    module('echo.index.carrier.invoicing.activeInvoices', function($provide) {
      $provide.value('app/pages/index/carrier/components/invoicing/components/active-invoices/active-invoices.component.html', '');
      $provide.value('PagingModel', PagingModel = jasmine.createSpy());
      $provide.value('invoicesApi', invoicesApi = jasmine.createSpyObj('invoicesApi', ['fetchActiveInvoices']));
      $provide.value('invoiceCountsActionCreator',
        invoiceCountsActionCreator = jasmine.createSpyObj('invoiceCountsActionCreator', ['setInvoiceCounts']));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['dispatch', 'getState']));
    });

    inject(function($rootScope, $compile, $componentController, _$q_, _invoiceEnums_) {
      scope = $rootScope.$new();

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      carrierId = 2;

      invoiceEnums = _invoiceEnums_;
      $q = _$q_;

      store$.getState.and.returnValue(state = {
        rep: {},
        carrier: {
          carrierId: carrierId
        },
        invoiceCounts: {
          activeInvoices: 12
        }
      });

      PagingModel.and.returnValue(paging = jasmine.createSpyObj('paging', ['reset']));

      component = $componentController('activeInvoices', null, {});
      spyOn(component, 'fetchActiveInvoices');
      component.$onInit();
    });
  });

  describe('Function: filterHandler', function() {
    it('should fetch active invoices', function() {
      component.filterHandler(true, invoiceEnums.STATUSES.IN_REVIEW.value);
      expect(component.filterBy).toEqual(invoiceEnums.STATUSES.IN_REVIEW.value);
      expect(component.fetchActiveInvoices).toHaveBeenCalled();
    });

    it('should reset filter', function() {
      component.filterHandler(false);
      expect(component.filterBy).toBeUndefined();
      expect(component.fetchActiveInvoices).toHaveBeenCalled();
    });
  });

  describe('Function: fetchActiveInvoices', function() {
    beforeEach(function() {
      component.fetchActiveInvoices.and.callThrough();
    });

    it('should fetch active invoices with filter enum', function() {
      invoicesApi.fetchActiveInvoices.and.returnValue($q.when());
      component.fetchActiveInvoices();
      expect(invoicesApi.fetchActiveInvoices).toHaveBeenCalledWith(carrierId, paging, component.filterBy);
    });

    it('should setup active invoices', function() {
      var invoicesPageData = {
        invoices: [{
          id: 1
        }]
      };

      invoicesApi.fetchActiveInvoices.and.returnValue($q.when(invoicesPageData));
      component.fetchActiveInvoices();
      scope.$digest();
      expect(component.activeInvoices).toEqual(invoicesPageData.invoices);
    });

    it('should setup invoice count', function() {
      var invoicesPageData = {
        invoicesCount: {
          activeInvoices: 12,
          unbilledLoads: 20,
          unbilledAmount: 10.56,
          totalActiveInvoiceAmount: 300.23
        }
      };

      invoicesApi.fetchActiveInvoices.and.returnValue($q.when(invoicesPageData));
      component.fetchActiveInvoices();
      scope.$digest();
      expect(component.paging.totalRecords).toEqual(invoicesPageData.invoicesCount.activeInvoices);
      expect(component.unbilledLoads).toEqual(invoicesPageData.invoicesCount.unbilledLoads);
      expect(component.unbilledAmount).toEqual(invoicesPageData.invoicesCount.unbilledAmount);
      expect(component.totalActiveInvoiceAmount).toEqual(invoicesPageData.invoicesCount.totalActiveInvoiceAmount);
    });

    it('should setup invoice count', function() {
      var invoicesPageData = {
        invoicesCount: {
          activeInvoices: 12,
          unbilledLoads: 20,
          unbilledAmount: 10.56,
          totalActiveInvoiceAmount: 300.23
        }
      };

      invoicesApi.fetchActiveInvoices.and.returnValue($q.when(invoicesPageData));
      component.fetchActiveInvoices();
      scope.$digest();
      expect(component.paging.totalRecords).toEqual(invoicesPageData.invoicesCount.activeInvoices);
      expect(component.unbilledLoads).toEqual(invoicesPageData.invoicesCount.unbilledLoads);
      expect(component.unbilledAmount).toEqual(invoicesPageData.invoicesCount.unbilledAmount);
      expect(component.totalActiveInvoiceAmount).toEqual(invoicesPageData.invoicesCount.totalActiveInvoiceAmount);
    });

    it('should update store with invoice counts', function() {
      var invoicesPageData = {
        invoicesCount: {
          activeInvoices: 12,
          unbilledLoads: 20,
          unbilledAmount: 10.56,
          totalActiveInvoiceAmount: 300.23
        }
      };
      
      state.invoiceCounts = {};

      invoicesApi.fetchActiveInvoices.and.returnValue($q.when(invoicesPageData));
      component.fetchActiveInvoices();
      scope.$digest();
      expect(store$.dispatch).toHaveBeenCalledWith(invoiceCountsActionCreator.setInvoiceCounts());
    });
  });
});