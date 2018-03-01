describe('Component: Unbilled Loads', function() {
  var component, scope, $q, carrierId, store$, loadsApi, unbilledLoadData;

  beforeEach(function() {
    module('unbilled-loads.component.html');
    module('echo.index.carrier.loadManagement.unbilledLoads', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchUnbilledLoads']));
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
    unbilledLoadData = {
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

    component = $componentController('unbilledLoads', null, {});

    spyOn(component, 'getUnbilledLoads');
    component.getUnbilledLoads.and.callFake(function() { });
    component.$onInit();
  }));

  describe('Function: getUnbilledLoads', function() {
    beforeEach(function() {
      component.getUnbilledLoads.and.callThrough();
    });

    it('should fetch unbilled loads', function() {
      var deferred = $q.defer();
      loadsApi.fetchUnbilledLoads.and.returnValue(deferred.promise);
      component.getUnbilledLoads();
      deferred.resolve(unbilledLoadData);

      scope.$digest();

      expect(loadsApi.fetchUnbilledLoads).toHaveBeenCalledWith(carrierId, component.paging, component.isPODNeeded, component.isInvoiceNeeded);
      expect(component.paging.totalRecords).toBe(24);
      expect(component.paging.recordCount).toBe(4);
      expect(component.unbilledLoads).toBe(unbilledLoadData.loads);
    });
  });

  describe('Function: invoiceNeededHandler', function() {
    it('should set filter text to default', function() {
      var deferred = $q.defer();
      loadsApi.fetchUnbilledLoads.and.returnValue(deferred.promise);
      component.invoiceNeededHandler(false);
      deferred.resolve(unbilledLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By Last Delivery Stop');
      expect(component.isPODNeeded).toBe(false);
      expect(component.isInvoiceNeeded).toBe(false);
    });

    it('should set filter text to invoice needed', function() {
      var deferred = $q.defer();
      loadsApi.fetchUnbilledLoads.and.returnValue(deferred.promise);
      component.invoiceNeededHandler(true);
      deferred.resolve(unbilledLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By Invoice Needed');
      expect(component.isPODNeeded).toBe(false);
      expect(component.isInvoiceNeeded).toBe(true);
    });
  });

  describe('Function: podNeededHandler', function() {
    it('should set filter text to default', function() {
      var deferred = $q.defer();
      loadsApi.fetchUnbilledLoads.and.returnValue(deferred.promise);
      component.podNeededHandler(false);
      deferred.resolve(unbilledLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By Last Delivery Stop');
      expect(component.isPODNeeded).toBe(false);
      expect(component.isInvoiceNeeded).toBe(false);
    });

    it('should set filter text to POD needed', function() {
      var deferred = $q.defer();
      loadsApi.fetchUnbilledLoads.and.returnValue(deferred.promise);
      component.podNeededHandler(true);
      deferred.resolve(unbilledLoadData);

      scope.$digest();

      expect(component.filterText).toBe('By POD Needed');
      expect(component.isPODNeeded).toBe(true);
      expect(component.isInvoiceNeeded).toBe(false);
    });
  });

});