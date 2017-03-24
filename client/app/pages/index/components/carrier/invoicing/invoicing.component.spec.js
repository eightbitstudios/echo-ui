describe('Component: Invoicing', function() {
  var component, scope, state, stateParams, store$, routesConfig;

  beforeEach(function() {
    module('echo.index.carrier.invoicing', function($provide) {
      $provide.value('invoicing.component.html', '');
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$state', state = jasmine.createSpyObj('state', ['go']));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['subscribe', 'getState']));
    });

    inject(function($rootScope, $compile, $componentController, _routesConfig_) {
      scope = $rootScope.$new();

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      routesConfig = _routesConfig_;

      store$.getState.and.returnValue({
        rep: {},
        carrier: {}
      });

      state.$current = {};

      component = $componentController('invoicing', null, {});
    });
  });

  describe('Function: $onInit', function() {
    beforeEach(function() {
      component.$onInit();
    });
    it('should subscribe to store', function() {
      expect(store$.subscribe).toHaveBeenCalled();
    });

    it('should create tab bar items when store is updated', function() {
      var invoiceCounts = {
        activeInvoices: 23
      };

      spyOn(component, 'createTabItems');

      var callback = store$.subscribe.calls.argsFor(0)[0];
      callback({
        invoiceCounts: invoiceCounts
      });
      expect(component.createTabItems).toHaveBeenCalledWith(invoiceCounts);
    });

    it('should not create tab bar if invoice count is not set', function() {
      spyOn(component, 'createTabItems');

      var callback = store$.subscribe.calls.argsFor(0)[0];
      callback({
        invoiceCounts: null
      });
      expect(component.createTabItems).not.toHaveBeenCalled();
    });
  });

  describe('Function: createTabItems', function() {
    it('should create active invoices tab item', function() {
      var invoiceCounts = {
        activeInvoices: 23
      };
      component.createTabItems(invoiceCounts);

      expect(component.tabItems.length).toBe(1);
    });
  });

  describe('Function: routeToSearch', function() {
    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      state.$current.name = routesConfig.INDEX.searchInvoices.name;
      stateParams.previous = 'active';

      component.routeToSearch(searchText);

      expect(state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: stateParams.previous
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });

    it('should set previous route to search loads page', function() {
      var searchText = 'test';
      state.$current.name = routesConfig.INDEX.searchInvoices.name;

      component.routeToSearch(searchText);

      expect(state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: state.$current.name
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });

    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      state.$current.name = 'active';
      stateParams.previous = routesConfig.INDEX.searchInvoices.name;

      component.routeToSearch(searchText);

      expect(state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchInvoices.name, {
        searchText: searchText,
        previous: state.$current.name
      }, {
        reload: routesConfig.INDEX.searchInvoices.name
      });
    });
  });

  describe('Function: $onDestroy', function() {
    it('should unsubcribe from store event stream', function() {
      var sub = jasmine.createSpyObj('sub', ['dispose']);
      store$.subscribe.and.returnValue(sub);
      component.$onInit();

      component.$onDestroy();

      expect(sub.dispose).toHaveBeenCalled();
    });
  });
});