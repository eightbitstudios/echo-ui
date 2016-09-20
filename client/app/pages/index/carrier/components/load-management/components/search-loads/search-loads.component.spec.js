
describe('Component: Search Loads', function () {
  var component, scope, $q, $state, carrierId, searchText, loadsApi, searchLoads;

  beforeEach(function () {
    module('app/pages/index/carrier/components/load-management/components/search-loads/search-loads.template.html');
    module('echo.index.carrier.loadManagement.searchLoads', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchLoadsBySearchText']));
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['previous']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    $state.previous = { name: 'test', data: { name: 'other test' } };

    carrierId = 1;
    searchText = 'test';
    searchLoads = {
      totalLoadCount: 24,
      loads: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        }
      ]
    };

    component = $componentController('searchLoads', null, {
      carrierId: carrierId,
      searchText: searchText
    });
  }));

  describe('Function: getLoads', function () {
    it('should fetch loads', function () {
      var deferred = $q.defer();
      loadsApi.fetchLoadsBySearchText.and.returnValue(deferred.promise);
      component.getLoads();
      deferred.resolve(searchLoads);

      scope.$digest();

      expect(loadsApi.fetchLoadsBySearchText).toHaveBeenCalledWith(carrierId, searchText, component.paging);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.loads).toBe(searchLoads.loads);
    });
  });

  describe('Function: getLoadsBySearchText', function () {
    it('should reset paging and call fetch loads', function () {
      var deferred = $q.defer();
      loadsApi.fetchLoadsBySearchText.and.returnValue(deferred.promise);
      component.getLoadsBySearchText();
      deferred.resolve(searchLoads);

      scope.$digest();

      expect(loadsApi.fetchLoadsBySearchText).toHaveBeenCalledWith(carrierId, searchText, component.paging);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.loads).toBe(searchLoads.loads);
    });
  });

});
