describe('Component: loadManagement', function() {
  var component, scope, $stateParams, $state, loadCountsActionCreator, store$, routesConfig;

  beforeEach(function() {
    module('echo.index.carrier.loadManagement', function($provide) {
      $provide.value('load-management.component.html', '');
      $provide.value('$stateParams', $stateParams = {});
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['go']));
      $provide.constant('loadCountsActionCreator',
        loadCountsActionCreator = jasmine.createSpyObj('loadCountsActionCreator', ['fetchLoadCounts']));
      $provide.constant('store$',
        store$ = jasmine.createSpyObj('store$', ['getState', 'subscribe', 'dispatch']));
    });

    inject(function($rootScope, $componentController, _routesConfig_) {
      scope = $rootScope.$new();

      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      routesConfig = _routesConfig_;

      store$.getState.and.returnValue({
        carrier: {}
      });

      $state.$current = {
        data: {
          isActiveLoads: true
        }
      };

      component = $componentController('loadManagement', null, {});
    });
  });

  describe('Function: $onInit', function() {
    it('should subscribe to store stream', function() {
      component.$onInit();

      expect(store$.subscribe).toHaveBeenCalled();
    });

    it('should create tab items once load counts are fetched', function() {
      var state = {
        loadCounts: {
          count: 1
        }
      };

      spyOn(component, 'createTabItems');

      component.$onInit();
      store$.subscribe.calls.argsFor(0)[0](state);
      expect(component.createTabItems).toHaveBeenCalledWith(state.loadCounts);
    });

    it('should not create tab items until load counts are fetched', function() {
      var state = {
        loadCounts: {}
      };

      spyOn(component, 'createTabItems');

      component.$onInit();
      store$.subscribe.calls.argsFor(0)[0](state);
      expect(component.createTabItems).not.toHaveBeenCalled();
    });

    it('should fetch load counts if not on active loads page', function() {
      $state.$current.data.isActiveLoads = false;
      component.$onInit();
      expect(loadCountsActionCreator.fetchLoadCounts).toHaveBeenCalled();
      expect(store$.dispatch).toHaveBeenCalled();
    });
  });

  describe('Function: createTabItems', function() {
    it('should create tab items', function() {
      var loadCounts = {
        active: 10,
        unbilled: 2,
        upcoming: 5
      };

      component.createTabItems(loadCounts);

      expect(component.tabItems.length).toBe(3);
    });
  });

  describe('Function: routeToSearch', function() {
    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      $state.$current.name = routesConfig.INDEX.searchLoads.name;
      $stateParams.previous = 'active';

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchLoads.name, {
        searchText: searchText,
        previous: $stateParams.previous
      }, {
        reload: routesConfig.INDEX.searchLoads.name
      });
    });
    
    it('should set previous route to search loads page', function() {
      var searchText = 'test';
      $state.$current.name = routesConfig.INDEX.searchLoads.name;

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchLoads.name, {
        searchText: searchText,
        previous: $state.$current.name
      }, {
        reload: routesConfig.INDEX.searchLoads.name
      });
    });
      
    it('should set previous route to active loads page', function() {
      var searchText = 'test';
      $state.$current.name = 'active';
      $stateParams.previous = routesConfig.INDEX.searchLoads.name;

      component.routeToSearch(searchText);

      expect($state.go).toHaveBeenCalledWith(routesConfig.INDEX.searchLoads.name, {
        searchText: searchText,
        previous: $state.$current.name
      }, {
        reload: routesConfig.INDEX.searchLoads.name
      });
    });
  });
});