
describe('Component: Active Loads', function () {
  var component, scope, $q, carrierId, loadsApi, availableData;

  beforeEach(function () {
    module('app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html');
    module('echo.index.carrier.loadManagement.activeLoads', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchAvailableLoads']));
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

    component = $componentController('activeLoads', null, {
      carrierId: carrierId
    });
  }));

  describe('Function: getAvailableLoads', function () {
    it('should fetch available loads', function () {
      var deferred = $q.defer();
      loadsApi.fetchAvailableLoads.and.returnValue(deferred.promise);
      component.getAvailableLoads();
      deferred.resolve(availableData);

      scope.$digest();

      expect(loadsApi.fetchAvailableLoads).toHaveBeenCalledWith(carrierId, component.paging, component.isPickUpToday, component.isDeliveriesToday);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.activeLoads).toBe(availableData.loads);
    });
  });

  describe('Function: deliveriesTodayHandler', function () {
    it('should set filter text to default', function () {
      var deferred = $q.defer();
      loadsApi.fetchAvailableLoads.and.returnValue(deferred.promise);
      component.deliveriesTodayHandler(false);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
    });

    it('should set filter text to next delivery', function () {
      var deferred = $q.defer();
      loadsApi.fetchAvailableLoads.and.returnValue(deferred.promise);
      component.deliveriesTodayHandler(true);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Delivery');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(true);
    });
  });

  describe('Function: pickupsTodayHandler', function () {
    it('should set filter text to default', function () {
      var deferred = $q.defer();
      loadsApi.fetchAvailableLoads.and.returnValue(deferred.promise);
      component.pickupsTodayHandler(false);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
    });

    it('should set filter text to next pickup', function () {
      var deferred = $q.defer();
      loadsApi.fetchAvailableLoads.and.returnValue(deferred.promise);
      component.pickupsTodayHandler(true);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Pickup');
      expect(component.isPickUpToday).toBe(true);
      expect(component.isDeliveriesToday).toBe(false);
    });
  });

});
