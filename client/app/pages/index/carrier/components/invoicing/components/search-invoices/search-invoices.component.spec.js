describe('Component: Search Invoices', function() {
  var component, scope, state, stateParams, store$, PagingModel, invoicesApi, paging, carrierId, $q;

  beforeEach(function() {
    module('echo.index.carrier.invoicing.searchInvoices', function($provide) {
      $provide.value('app/pages/index/carrier/components/invoicing/components/search-invoices/search-invoices.component.html', '');
      $provide.value('$stateParams', stateParams = {
        searchText: 'test'
      });
      $provide.value('$state', state = {});
      $provide.value('invoicesApi',
        invoicesApi = jasmine.createSpyObj('invoicesApi', ['fetchInvoicesBySearchText']));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('PagingModel', PagingModel = jasmine.createSpy());
    });

    inject(function($rootScope, $compile, $componentController, _$q_) {
      scope = $rootScope.$new();

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      $q = _$q_;

      carrierId = 3;

      store$.getState.and.returnValue({
        rep: {},
        carrier: {
          carrierId: carrierId
        }
      });

      PagingModel.and.returnValue(paging = jasmine.createSpyObj('paging', ['reset']));

      component = $componentController('searchInvoices', null, {});
      spyOn(component, 'getInvoicesBySearchText');
      component.$onInit();
    });
  });

  describe('Function: getInvoices', function() {
    it('should call invoices api', function() {
      invoicesApi.fetchInvoicesBySearchText.and.returnValue($q.when({}));
      component.getInvoices();

      expect(invoicesApi.fetchInvoicesBySearchText).toHaveBeenCalledWith(carrierId, stateParams.searchText, paging);
    });
  });

  describe('Function: getInvoicesBySearchText', function() {
    beforeEach(function() {
      component.getInvoicesBySearchText.and.callThrough();
    });

    it('should call invoices api and clear paging', function() {
      spyOn(component, 'getInvoices');
      component.getInvoicesBySearchText();

      expect(component.getInvoices).toHaveBeenCalled();
      expect(paging.reset).toHaveBeenCalled();
    });
  });
});