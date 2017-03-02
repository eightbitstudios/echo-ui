describe('Component: Search Loads', function() {
  var component, scope, $q, $state, carrierId, $stateParams, store$, loadsApi, searchLoads;

  beforeEach(function() {
    module('app/pages/index/carrier/components/load-management/components/search-loads/search-loads.template.html');
    module('echo.index.carrier.loadManagement.searchLoads', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchLoadsBySearchText']));
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['previous']));
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.value('$stateParams', $stateParams = {});
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_, PagingModel) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    $state.previous = {
      name: 'test',
      data: {
        name: 'other test'
      }
    };

    carrierId = 1;

    searchLoads = {
      totalLoadCount: 24,
      loads: [{
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      }, {
        id: 4
      }]
    };

    store$.getState.and.returnValue({
      carrier: {
        carrierId: carrierId
      }
    });
    $stateParams.searchText = 'test';

    component = $componentController('searchLoads', null, {});
    spyOn(component, 'getLoadsBySearchText');
    component.$onInit();
    component.paging = new PagingModel(10);
  }));

  describe('Function: getLoads', function() {
    beforeEach(function() {
      component.getLoadsBySearchText.and.callThrough();
    });
    it('should fetch loads', function() {
      var deferred = $q.defer();
      loadsApi.fetchLoadsBySearchText.and.returnValue(deferred.promise);
      component.getLoads();
      deferred.resolve(searchLoads);

      scope.$digest();

      expect(loadsApi.fetchLoadsBySearchText).toHaveBeenCalledWith(carrierId, $stateParams.searchText, component.paging);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.loads).toBe(searchLoads.loads);
    });
  });

  describe('Function: getLoadsBySearchText', function() {
    beforeEach(function() {
      component.getLoadsBySearchText.and.callThrough();
    });
    it('should reset paging and call fetch loads', function() {

      var deferred = $q.defer();
      loadsApi.fetchLoadsBySearchText.and.returnValue(deferred.promise);
      component.getLoadsBySearchText();
      deferred.resolve(searchLoads);

      scope.$digest();

      expect(loadsApi.fetchLoadsBySearchText).toHaveBeenCalledWith(carrierId, $stateParams.searchText, component.paging);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.loads).toBe(searchLoads.loads);
    });
  });

});