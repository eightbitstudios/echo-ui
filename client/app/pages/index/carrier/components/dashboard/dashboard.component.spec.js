
describe('Component: dashboard', function () {
  var component, $q, scope, reset, carrierId, routesConfig, PagingModel, loadsApi, loadTypesEnum;

  beforeEach(function () {
    module('app/pages/index/carrier/components/dashboard/dashboard.template.html');
    module('echo.index.carrier.dashboard', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('carrierApi', ['fetchLoadsNeedingAction', 'fetchMultiStopLoads', 'fetchLoadCount']));
      $provide.value('PagingModel', PagingModel = jasmine.createSpy('PagingModel'));
      $provide.value('routesConfig', routesConfig = {
        INDEX: {
          activeLoads: {
            name: 'active'
          }
        }
      });
      $provide.value('loadTypesEnum', loadTypesEnum = {
        ACTIVE: 'active'
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    carrierId = 1;

    reset = jasmine.createSpy('reset');

    PagingModel.and.returnValue({
      reset: reset,
      setRecords: jasmine.createSpy('setRecords')
    });

    component = $componentController('dashboard', null, { repDetails: {}, carrierId: carrierId });
  }));

  describe('Function: $onInit', function () {
    var actionLoadsDefer,
      multistopDefer,
      loadCountDefer;

    beforeEach(function () {
      actionLoadsDefer = $q.defer();
      multistopDefer = $q.defer();
      loadCountDefer = $q.defer();

      spyOn(component, 'fetchLoadsNeedingAction');
      spyOn(component, 'fetchMultiStopLoads');
      loadsApi.fetchLoadCount.and.returnValue(loadCountDefer.promise);
      component.fetchLoadsNeedingAction.and.returnValue(actionLoadsDefer.promise);
      component.fetchMultiStopLoads.and.returnValue(multistopDefer.promise);
      component.$onInit();
    });

    it('should call multistop loads', function () {
      expect(component.fetchMultiStopLoads).toHaveBeenCalled();
    });

    it('should call loads needing action', function () {
      expect(component.fetchLoadsNeedingAction).toHaveBeenCalled();
    });

    it('should call load counts', function () {
      expect(loadsApi.fetchLoadCount).toHaveBeenCalledWith(carrierId);
    });

    it('should set active load counts', function (done) {
      var loadCounts = {
        active: 3
      };
      actionLoadsDefer.resolve({});
      multistopDefer.resolve({});
      loadCountDefer.resolve(loadCounts);

      scope.$digest();

      loadCountDefer.promise.then(function () {
        expect(component.activeLoadCount).toBe(loadCounts.active);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: fetchMultiStopLoads', function () {
    var multistopDefer;

    beforeEach(function () {
      multistopDefer = $q.defer();
      loadsApi.fetchMultiStopLoads.and.returnValue(multistopDefer.promise);
    });

    it('should call paging reset', function () {
      component.fetchMultiStopLoads();
      expect(reset).toHaveBeenCalled();
    });

    it('should call multistop loads api', function () {
      component.fetchMultiStopLoads();
      expect(loadsApi.fetchMultiStopLoads).toHaveBeenCalledWith(carrierId, PagingModel());
    });

    it('should set multistop loads', function (done) {
      var multiStopLoads = {
        loads: [{
          id: 1
        }]
      };
      multistopDefer.resolve(multiStopLoads);
      component.fetchMultiStopLoads();
      multistopDefer.promise.then(function () {
        expect(component.multiStopLoads).toEqual(multiStopLoads.loads);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: fetchLoadsNeedingAction', function () {
    var actionLoadsDefer;

    beforeEach(function () {
      actionLoadsDefer = $q.defer();
      loadsApi.fetchLoadsNeedingAction.and.returnValue(actionLoadsDefer.promise);
    });

    it('should call paging reset', function () {
      component.fetchLoadsNeedingAction();
      expect(reset).toHaveBeenCalled();
    });

    it('should call multistop loads api', function () {
      component.fetchLoadsNeedingAction();
      expect(loadsApi.fetchLoadsNeedingAction).toHaveBeenCalledWith(carrierId, PagingModel());
    });

    it('should set multistop loads', function (done) {
      var activeLoads = {
        loads: [{
          id: 1
        }]
      };
      actionLoadsDefer.resolve(activeLoads);
      component.fetchLoadsNeedingAction();
      actionLoadsDefer.promise.then(function () {
        expect(component.activeLoads).toEqual(activeLoads.loads);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: showMoreMultiStopLoadsHandler', function () {
    var multiStopLoadsDefer;

    beforeEach(function () {
      multiStopLoadsDefer = $q.defer();
      loadsApi.fetchMultiStopLoads.and.returnValue(multiStopLoadsDefer.promise);
    });

    it('should call multistop loads api', function () {
      component.showMoreMultiStopLoadsHandler();
      expect(loadsApi.fetchMultiStopLoads).toHaveBeenCalledWith(carrierId, PagingModel());
    });

    it('should set multistop loads', function (done) {
      component.multiStopLoads = [];
      var multiStopLoads = {
        loads: [{
          id: 1
        }]
      };
      multiStopLoadsDefer.resolve(multiStopLoads);
      component.showMoreMultiStopLoadsHandler();
      multiStopLoadsDefer.promise.then(function () {
        expect(component.multiStopLoads).toEqual(multiStopLoads.loads);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: showMoreActionLoadsHandler', function () {
    var actionLoadsDefer;

    beforeEach(function () {
      actionLoadsDefer = $q.defer();
      loadsApi.fetchLoadsNeedingAction.and.returnValue(actionLoadsDefer.promise);
    });

    it('should call multistop loads api', function () {
      component.showMoreActionLoadsHandler();
      expect(loadsApi.fetchLoadsNeedingAction).toHaveBeenCalledWith(carrierId, PagingModel());
    });

    it('should set multistop loads', function (done) {
      component.activeLoads = [];
      var activeLoads = {
        loads: [{
          id: 1
        }]
      };
      actionLoadsDefer.resolve(activeLoads);
      component.showMoreActionLoadsHandler();
      actionLoadsDefer.promise.then(function () {
        expect(component.activeLoads).toEqual(activeLoads.loads);
        done();
      });

      scope.$digest();
    });
  });
});