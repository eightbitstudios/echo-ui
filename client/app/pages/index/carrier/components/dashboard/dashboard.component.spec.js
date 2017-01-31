describe('Component: Dashboard Loads', function() {
  var component, scope, $q, carrierId, availableData,
    PagingModel, DashboardRequestBuilder, requestBuilderObj,
    requestDefer, pagingModelObj, store$;

  beforeEach(function() {
    module('echo.index.carrier.dashboard', function($provide) {
      $provide.value('PagingModel', PagingModel = jasmine.createSpy('PagingModel'));
      $provide.value('app/pages/index/carrier/components/dashboard/dashboard.template.html');
      $provide.value('DashboardRequestBuilder',
        DashboardRequestBuilder = jasmine.createSpy('DashboardRequestBuilder'));
      $provide.value('store$',
        store$ = jasmine.createSpyObj('store$', ['getState']));

    });

    inject(function($rootScope, $compile, $componentController, _$q_) {
      scope = $rootScope.$new();
      scope.ctrl = {
        getComponent: jasmine.createSpy('getComponent')
      };

      $q = _$q_;

      carrierId = 1;
      availableData = {
        singleStopLoads: {
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
        multiStopLoads: {
          totalLoadCount: 14,
          loads: [{
            id: 4
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

      store$.getState.and.returnValue({
        rep: {
          userId: 100
        }
      });

      requestBuilderObj = jasmine.createSpyObj('requestBuilderObj', ['fetchSingleStopLoads', 'fetchSingleStopLoads', 'fetchMultiStopLoads', 'fetchDashboardPage', 'execute']);
      DashboardRequestBuilder.and.returnValue(requestBuilderObj);
      requestBuilderObj.fetchSingleStopLoads.and.returnValue({
        execute: requestBuilderObj.execute
      });
      requestBuilderObj.fetchMultiStopLoads.and.returnValue({
        execute: requestBuilderObj.execute
      });
      requestBuilderObj.fetchDashboardPage.and.returnValue({
        execute: requestBuilderObj.execute
      });

      requestDefer = $q.defer();
      requestBuilderObj.execute.and.returnValue(requestDefer.promise);

      pagingModelObj = jasmine.createSpyObj('pagingModelObj', ['setRecords', 'reset']);
      PagingModel.and.returnValue(pagingModelObj);

      component = $componentController('dashboard', null, {
        carrierId: carrierId
      });

      spyOn(component, 'fetchLoadDashboard');
      component.fetchLoadDashboard.and.callFake(_.noop);

      component.$onInit();
    });
  });

  describe('Function: showMoreActionLoadsHandler', function() {
    it('should fetch single stop loads', function() {
      component.showMoreActionLoadsHandler();
      requestDefer.resolve(availableData);
      component.activeLoads = [];
      scope.$digest();

      expect(component.activeLoads).toEqual(availableData.singleStopLoads.loads);
    });
  });

  describe('Function: fetchLoadsNeedingAction', function() {
    it('should fetch single stop loads', function() {
      component.fetchLoadsNeedingAction();
      requestDefer.resolve(availableData);
      component.activeLoads = [];
      scope.$digest();

      expect(component.activeLoads).toEqual(availableData.singleStopLoads.loads);
    });
  });

  describe('Function: fetchMultistopLoads', function() {
    it('should fetch multi stop loads', function() {
      component.fetchMultistopLoads();
      requestDefer.resolve(availableData);
      component.multiStopLoads = [];
      scope.$digest();

      expect(component.multiStopLoads).toEqual(availableData.multiStopLoads.loads);
    });
  });

  describe('Function: showMoreMultiStopLoadsHandler', function() {
    it('should fetch multi stop loads', function() {
      component.showMoreMultiStopLoadsHandler();
      requestDefer.resolve(availableData);
      component.multiStopLoads = [];
      scope.$digest();

      expect(component.multiStopLoads).toEqual(availableData.multiStopLoads.loads);
    });
  });

  describe('Function: refreshPageData', function() {
    it('should fetch dashboard page data', function() {
      component.refreshPageData();
      expect(component.fetchLoadDashboard).toHaveBeenCalled();
    });
  });

  describe('Function: fetchLoadDashboard', function() {
    beforeEach(function() {
      component.fetchLoadDashboard.and.callThrough();
    });

    it('should fetch dashboard page data', function() {
      component.fetchLoadDashboard();
      requestDefer.resolve(availableData);
      scope.$digest();

      expect(component.multiStopLoads).toEqual(availableData.multiStopLoads.loads);
      expect(component.activeLoads).toEqual(availableData.singleStopLoads.loads);
    });

    it('should default loads to empty array', function() {
      component.fetchLoadDashboard();
      requestDefer.resolve({});
      scope.$digest();

      expect(component.multiStopLoads).toEqual([]);
      expect(component.activeLoads).toEqual([]);
    });
  });
});