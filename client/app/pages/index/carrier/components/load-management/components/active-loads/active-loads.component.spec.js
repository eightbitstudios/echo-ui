
describe('Component: Active Loads', function () {
  var component, scope, $q, carrierId, loadsApi, availableData;

  beforeEach(function () {
    module('app/pages/index/carrier/components/load-management/components/active-loads/active-loads.template.html');
    module('echo.index.carrier.loadManagement.activeLoads', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchActiveLoadsPage']));
      $provide.value('googleMapsDirective', {});
      $provide.value('googleMapsMarkerDirective', {});
      $provide.value('googleMapsInfoWindowDirective', {});
      $provide.value('googleMapsApi', _.noop);
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
      }
    };

    component = $componentController('activeLoads', null, {
      carrierId: carrierId
    });
  }));

  describe('Function: getPageData', function () {
    xit('should fetch available data', function () {
      var deferred = $q.defer();
      loadsApi.fetchActiveLoadsPage.and.returnValue(deferred.promise);
      component.getPageData(true, true, true);
      deferred.resolve(availableData);

      scope.$digest();

      expect(loadsApi.fetchActiveLoadsPage).toHaveBeenCalledWith(carrierId, component.paging, component.isPickUpToday, component.isDeliveriesToday, true, true, true);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.activeLoads).toBe(availableData.loads.loads);
    });
  });

  describe('Function: deliveriesTodayHandler', function () {
    it('should set filter text to default', function () {
      var deferred = $q.defer();
      loadsApi.fetchActiveLoadsPage.and.returnValue(deferred.promise);
      component.deliveriesTodayHandler(false);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
    });

    it('should set filter text to next delivery', function () {
      var deferred = $q.defer();
      loadsApi.fetchActiveLoadsPage.and.returnValue(deferred.promise);
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
      loadsApi.fetchActiveLoadsPage.and.returnValue(deferred.promise);
      component.pickupsTodayHandler(false);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Appointment');
      expect(component.isPickUpToday).toBe(false);
      expect(component.isDeliveriesToday).toBe(false);
    });

    it('should set filter text to next pickup', function () {
      var deferred = $q.defer();
      loadsApi.fetchActiveLoadsPage.and.returnValue(deferred.promise);
      component.pickupsTodayHandler(true);
      deferred.resolve(availableData);

      scope.$digest();

      expect(component.filterText).toBe('By Next Pickup');
      expect(component.isPickUpToday).toBe(true);
      expect(component.isDeliveriesToday).toBe(false);
    });
  });

});
