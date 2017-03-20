describe('Component: Active Loads', function() {
  var component, scope, $q, carrierId, availableData,
    ActiveLoadsRequestBuilder, requestBuilderObj, requestDefer,
    store$;

  beforeEach(function() {
    module('echo.index.carrier.loadManagement.activeLoads', function($provide) {
      $provide.value('active-loads.component.html', '');
      $provide.value('ActiveLoadsRequestBuilder',
        ActiveLoadsRequestBuilder = jasmine.createSpy('ActiveLoadsRequestBuilder'));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['dispatch', 'getState']));
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    availableData = {
      loads: {
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
      },
      mapLoads: [{
        id: 1
      }, {
        id: 2
      }],
      loadsCount: {
        active: 12,
        unbilled: 13,
        upcoming: 4
      }
    };

    requestBuilderObj = jasmine.createSpyObj('requestBuilderObj', ['fetchMapData', 'fetchLoadsCount', 'fetchActiveLoads', 'hasMapData', 'filterByPickupsToday', 'filterByDeliveriesToday', 'execute']);
    ActiveLoadsRequestBuilder.and.returnValue(requestBuilderObj);
    requestBuilderObj.fetchActiveLoads.and.returnValue({
      execute: requestBuilderObj.execute
    });
    requestDefer = $q.defer();
    requestBuilderObj.execute.and.returnValue(requestDefer.promise);

    store$.getState.and.returnValue({
      rep: {},
      loadCounts: {},
      carrier: {
        carrierId: carrierId
      }
    });

    component = $componentController('activeLoads', null, {});
    spyOn(component, 'getPageData');

    component.$onInit();
  }));

  describe('Function: deliveriesTodayHandler', function() {
    beforeEach(function() {
      component.getPageData.and.callThrough();
    });
    it('should set filter text to default', function() {
      component.deliveriesTodayHandler(false);

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);

      expect(requestBuilderObj.filterByDeliveriesToday).not.toHaveBeenCalled();
    });

    it('should set filter text to next delivery', function() {
      component.deliveriesTodayHandler(true);
      expect(component.filterText).toBe('By Next Delivery');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(true);
      expect(requestBuilderObj.filterByDeliveriesToday).toHaveBeenCalled();
    });
  });

  describe('Function: pickupsTodayHandler', function() {
    beforeEach(function() {
      component.getPageData.and.callThrough();
    });
    it('should set filter text to default', function() {
      component.pickupsTodayHandler(false);

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
      expect(requestBuilderObj.filterByPickupsToday).not.toHaveBeenCalled();
    });

    it('should set filter text to next pickup', function() {
      component.pickupsTodayHandler(true);

      expect(component.filterText).toBe('By Next Pickup');
      expect(component.isPickUpToday).toBe(true);
      expect(component.isDeliveriesToday).toBe(false);
      expect(requestBuilderObj.filterByPickupsToday).toHaveBeenCalled();
    });
  });

  describe('Function: getPageData', function() {
    beforeEach(function() {
      component.getPageData.and.callThrough();
    });
    it('should fetch map data', function() {
      requestBuilderObj.hasMapData.and.returnValue(true);
      component.getPageData(requestBuilderObj);

      expect(requestBuilderObj.hasMapData).toHaveBeenCalled();
    });

    it('should fetch only activeLoads', function() {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.loadsCount = undefined;
      availableData.mapLoads = undefined;

      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBeUndefined();
      expect(store$.dispatch).not.toHaveBeenCalled();
    });

    it('should fetch loadsCount', function() {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.mapLoads = undefined;

      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBe(availableData.mapLoads);
      expect(store$.dispatch).toHaveBeenCalled();
    });

    it('should fetch mapLoads', function() {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.loadsCount = undefined;

      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBe(availableData.mapLoads);
      expect(store$.dispatch).not.toHaveBeenCalled();
    });

    it('should not load active loads', function() {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.loads = undefined;

      scope.$digest();

      expect(component.activeLoads).toBeUndefined();
    });
  });

  describe('Function: refreshPageData', function() {
    it('should not fetch loadsCount', function() {
      requestBuilderObj.fetchLoadsCount.calls.reset();
      component.refreshPageData();
      expect(requestBuilderObj.fetchMapData).toHaveBeenCalled();
      expect(requestBuilderObj.fetchLoadsCount).not.toHaveBeenCalled();
    });
  });

  describe('Function: fetchActiveLoads', function() {
    it('should call getPageData', function() {
      component.fetchActiveLoads();
      expect(component.getPageData).toHaveBeenCalled();
    });
  });

  describe('Function: $onInit', function() {

    it('should fetch loadCount', function() {
      component.$onInit();
      expect(requestBuilderObj.fetchLoadsCount).toHaveBeenCalled();
    });

    it('should not fetch loadCount', function() {
      requestBuilderObj.fetchLoadsCount.calls.reset();

      store$.getState.and.returnValue({
        rep: {},
        loadCounts: {
          active: 10
        },
        carrier: {
          carrierId: carrierId
        }
      });

      component.$onInit();
      expect(requestBuilderObj.fetchLoadsCount).not.toHaveBeenCalled();
    });
  });
});