describe('Component: Upcoming Loads', function() {
  var component, scope, $q, carrierId, loadsApi, upcomingLoadData, store$;

  beforeEach(function() {
    module('app/pages/index/carrier/components/load-management/components/upcoming-loads/upcoming-loads.template.html');
    module('echo.index.carrier.loadManagement.upcomingLoads', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchUpcomingLoads']));
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    upcomingLoadData = {
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

    store$.getState.and.returnValue({ carrier: {carrierId: carrierId}, rep:{} });

    component = $componentController('upcomingLoads', null, {});

    spyOn(component, 'getUpcomingLoads');
    component.getUpcomingLoads.and.callFake(function() {});
    component.$onInit();
  }));

  describe('Function: getUpcomingLoads', function() {
    beforeEach(function() {
      component.getUpcomingLoads.and.callThrough();
    });

    it('should fetch upcoming loads', function() {
      var deferred = $q.defer();
      loadsApi.fetchUpcomingLoads.and.returnValue(deferred.promise);
      component.getUpcomingLoads();
      deferred.resolve(upcomingLoadData);

      scope.$digest();

      expect(loadsApi.fetchUpcomingLoads).toHaveBeenCalledWith(carrierId, component.paging, component.isDriverNeeded);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.upcomingLoads).toBe(upcomingLoadData.loads);
    });
  });

  describe('Function: driverNeededHandler', function() {
    it('should set filter text to default', function() {
      var deferred = $q.defer();
      loadsApi.fetchUpcomingLoads.and.returnValue(deferred.promise);
      component.driverNeededHandler(false);
      deferred.resolve(upcomingLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By First Pickup Stop');
      expect(component.isDriverNeeded).toBe(false);
    });

    it('should set filter text to invoice needed', function() {
      var deferred = $q.defer();
      loadsApi.fetchUpcomingLoads.and.returnValue(deferred.promise);
      component.driverNeededHandler(true);
      deferred.resolve(upcomingLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By Driver Needed');
      expect(component.isDriverNeeded).toBe(true);
    });
  });

});