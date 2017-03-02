describe('Component: driverGrid', function() {
  var component, $q, carrierApi, appConstants, store$, scope, state, carrierId;

  beforeEach(function() {
    module('app/common/components/driver-grid/driver-grid.component.html');
    module('echo.components.driverGrid', function($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchDrivers', 'searchDrivers']));
      $provide.value('$state', state = jasmine.createSpyObj('$state', ['go']));
      $provide.value('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _appConstants_) {
    scope = $rootScope.$new();
    appConstants = _appConstants_;
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    carrierId = 1;
    carrierApi.fetchDrivers.and.returnValue($q.when({}));
    store$.getState.and.returnValue({
      carrier: {
        carrierId: carrierId
      }
    });
    component = $componentController('driverGrid', null, {});
    spyOn(component, 'getDrivers');
    component.$onInit();
  }));

  describe('Function: searchDrivers', function() {
    it('should call carrier service to search drivers', function() {
      var searchText = 'test';

      carrierApi.searchDrivers.and.returnValue($q.when());
      component.searchDrivers(searchText);

      expect(carrierApi.searchDrivers).toHaveBeenCalledWith(carrierId, searchText);
    });

    it('should map drivers to typeahead model', function(done) {
      var searchText = 'test',
        drivers = [{
          id: 1,
          firstName: 'Bob',
          lastName: 'Ted'
        }]
      carrierApi.searchDrivers.and.returnValue($q.when(drivers));
      component.searchDrivers(searchText).then(function(convertedDrivers) {
        expect(convertedDrivers).toEqual([{
          id: 1,
          name: 'Bob Ted',
          phone: undefined,
          tractorNumber: undefined
        }]);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: getDrivers', function() {
    beforeEach(function() {
      component.getDrivers.and.callThrough();
    });
    it('should fetch drivers', function() {
      var page = 2;
      carrierApi.fetchDrivers.and.returnValue($q.when());
      component.getDrivers();

      expect(carrierApi.fetchDrivers).toHaveBeenCalled();
    });
  });
});