
describe('Component: Active Loads', function () {
  var component, scope, $q, carrierId, availableData,
   loadCountService, ActiveLoadsRequestBuilder, requestBuilderObj, requestDefer;

  beforeEach(function () {
    module('echo.index.carrier.loadManagement.activeLoads', function ($provide) {  
      $provide.value('app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html', '');
      $provide.value('loadCountService', loadCountService = jasmine.createSpyObj('loadCountService', ['getLoadCount', 'setLoadCount']));
      $provide.value('ActiveLoadsRequestBuilder', 
        ActiveLoadsRequestBuilder = jasmine.createSpy('ActiveLoadsRequestBuilder'));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    availableData = {
      loads: {
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
      },
      mapLoads: [
        {
          id: 1
        },
        {
          id: 2
        }
      ],
      loadsCount: {
        active: 12,
        unbilled: 13,
        upcoming: 4
      }
    };

    requestBuilderObj = jasmine.createSpyObj('requestBuilderObj', ['fetchMapData', 'fetchLoadsCount', 'fetchActiveLoads', 'hasMapData', 'filterByPickupsToday', 'filterByDeliveriesToday', 'execute']);
    ActiveLoadsRequestBuilder.and.returnValue(requestBuilderObj);
    requestBuilderObj.fetchActiveLoads.and.returnValue({execute: requestBuilderObj.execute});
    requestDefer = $q.defer();
    requestBuilderObj.execute.and.returnValue(requestDefer.promise);
    
    component = $componentController('activeLoads', null, {
      carrierId: carrierId
    });
  }));

  describe('Function: deliveriesTodayHandler', function () {
    it('should set filter text to default', function () {
      component.deliveriesTodayHandler(false);
   
      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);

      expect(requestBuilderObj.filterByDeliveriesToday).not.toHaveBeenCalled();
    });

    it('should set filter text to next delivery', function () {
      component.deliveriesTodayHandler(true);
      expect(component.filterText).toBe('By Next Delivery');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(true);
      expect(requestBuilderObj.filterByDeliveriesToday).toHaveBeenCalled();
    });
  });

  describe('Function: pickupsTodayHandler', function () {
    it('should set filter text to default', function () {
      component.pickupsTodayHandler(false);

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
      expect(requestBuilderObj.filterByPickupsToday).not.toHaveBeenCalled();
    });

    it('should set filter text to next pickup', function () {
      component.pickupsTodayHandler(true);

      expect(component.filterText).toBe('By Next Pickup');
      expect(component.isPickUpToday).toBe(true);
      expect(component.isDeliveriesToday).toBe(false);
      expect(requestBuilderObj.filterByPickupsToday).toHaveBeenCalled();
    });
  });

  describe('Function: getPageData', function () {
    it('should fetch map data', function () {
      requestBuilderObj.hasMapData.and.returnValue(true);
      component.getPageData(requestBuilderObj);

      expect(requestBuilderObj.hasMapData).toHaveBeenCalled();
    });

    it('should fetch only activeLoads', function () {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.loadsCount = undefined;
      availableData.mapLoads = undefined;

      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBeUndefined();
      expect(loadCountService.setLoadCount).not.toHaveBeenCalled();
    });

    it('should fetch loadsCount', function () {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.mapLoads = undefined;

      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBe(availableData.mapLoads);
      expect(loadCountService.setLoadCount).toHaveBeenCalled();
    });

    it('should fetch mapLoads', function () {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);
      
      availableData.loadsCount = undefined;
      
      scope.$digest();

      expect(component.activeLoads).toBe(availableData.loads.loads);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.mapPoints).toBe(availableData.mapLoads);
      expect(loadCountService.setLoadCount).not.toHaveBeenCalled();
    });

    it('should not load active loads', function () {
      component.getPageData(requestBuilderObj);
      requestDefer.resolve(availableData);

      availableData.loads = undefined;
      
      scope.$digest();

      expect(component.activeLoads).toBeUndefined();
    });
  });

  describe('Function: refreshPageData', function () {
    it('should fetch only not loadsCount', function () {
      spyOn(component, 'getPageData');
      component.refreshPageData();
      expect(requestBuilderObj.fetchMapData).toHaveBeenCalled();
      expect(requestBuilderObj.fetchLoadsCount).not.toHaveBeenCalled();
    });
  });

  describe('Function: fetchActiveLoads', function () {
    it('should call getPageData', function () {
      spyOn(component, 'getPageData');
      component.fetchActiveLoads();
      expect(component.getPageData).toHaveBeenCalled();
    });
  });

  describe('Function: $onInit', function () {
    beforeEach(function() {
      spyOn(component, 'getPageData');
    });

    it('should fetch loadCount', function () {
      component.$onInit();
      expect(requestBuilderObj.fetchLoadsCount).toHaveBeenCalled();
    });

    it('should not fetch loadCount', function () {
      loadCountService.getLoadCount.and.returnValue({test: 1});
      component.$onInit();
      expect(requestBuilderObj.fetchLoadsCount).not.toHaveBeenCalled();
    });
  });
});
