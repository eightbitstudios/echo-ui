describe('Component: Invoicing', function() {
  var component, scope, $q, $state, $stateParams, invoicesApi, invoiceCountsActionCreator,
    carrierId, store$, routesConfig;

  beforeEach(function() {
    module('echo.index.carrier.invoicing', function($provide) {
      $provide.value('invoicing.component.html', '');
      $provide.value('$stateParams', $stateParams = {});
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['go']));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['dispatch', 'getState']));
      $provide.value('invoicesApi',
        invoicesApi = jasmine.createSpyObj('invoicesApi', ['fetchInvoiceCount']));
      $provide.value('invoiceCountsActionCreator',
        invoiceCountsActionCreator = jasmine.createSpyObj('invoiceCountsActionCreator', ['setInvoiceCounts']));
    });

    inject(function($rootScope, $compile, _$q_, $componentController, _routesConfig_) {
      scope = $rootScope.$new();
      $q = _$q_;

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      routesConfig = _routesConfig_;
      carrierId = 3;

      store$.getState.and.returnValue({
        rep: {},
        loadCounts: {},
        carrier: {
          carrierId: carrierId
        }
      });

      $state.$current = {};

      component = $componentController('invoicing', null, {});
    });
  });

  describe('Function: formatInvoiceCount', function() {
    it('should return 1000+ if count is greater than 1000', function() {
      expect(component.formatInvoiceCount(1001)).toEqual('1000+');
    });
    
    it('should return count value if less or equal than 1000', function() {
      expect(component.formatInvoiceCount(1000)).toEqual(1000);
    });
  });

  describe('Function: $onInit', function() {
    beforeEach(function() {
      spyOn(component, 'fetchInvoicesCount');
      component.$onInit();
    });
    it('should fetch load count', function() {
      expect(component.fetchInvoicesCount).toHaveBeenCalled();
    });
  });

  describe('Function: createTabItems', function() {
    it('should create active invoices tab item', function() {
      var invoiceCounts = {
        activeInvoices: 23,
        archivedInvoices: 2
      };
      component.createTabItems(invoiceCounts);

      expect(component.tabItems.length).toBe(2);
    });
  });

  describe('Function: fetchInvoicesCount', function() {
    it('should fetch invoice count', function() {
      component.carrierId = carrierId;
      invoicesApi.fetchInvoiceCount.and.returnValue($q.defer().promise);
      component.fetchInvoicesCount();

      expect(invoicesApi.fetchInvoiceCount).toHaveBeenCalledWith(carrierId);
    });

    it('should dispatch invoice count to store', function() {
      spyOn(component, 'createTabItems');
      var action = {
        type: 'SET_INVOICE_COUNTS'
      };

      invoiceCountsActionCreator.setInvoiceCounts.and.returnValue(action);
      invoicesApi.fetchInvoiceCount.and.returnValue($q.when());
      component.fetchInvoicesCount();
      scope.$digest();
      expect(store$.dispatch).toHaveBeenCalledWith(action);
    });
  });

  describe('Function: routeToSearch', function() {
    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      $state.$current.name = routesConfig.INDEX.searchInvoices.name;
      $stateParams.previous = 'active';

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: $stateParams.previous
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });

    it('should set previous route to search loads page', function() {
      var searchText = 'test';
      $state.$current.name = routesConfig.INDEX.searchInvoices.name;

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: $state.$current.name
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });

    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      $state.$current.name = 'active';
      $stateParams.previous = routesConfig.INDEX.searchInvoices.name;

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: $state.$current.name
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });
  });
});