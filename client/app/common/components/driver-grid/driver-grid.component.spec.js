
describe('Component: driverGrid', function () {
  var component, $q, carrierApi, driverList, element, state;

  beforeEach(function () {
    module('app/common/components/driver-grid/driver-grid.template.html');
    module('echo.components.driverGrid', function ($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchDrivers', 'searchDrivers']));
      $provide.value('$state', state =  jasmine.createSpyObj('$state', ['go']));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _appConstants_) {
    scope = $rootScope.$new();
    appConstants = _appConstants_;
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    carrierApi.fetchDrivers.and.returnValue($q.when({}));
    component = $componentController('driverGrid', null, {carrierId: 1});
  }));

  describe('Function: searchDrivers', function () {
    it('should call carrier service to search drivers', function () {
      var searchText = 'test';

      carrierApi.searchDrivers.and.returnValue($q.when());
      component.searchDrivers(searchText);

      expect(carrierApi.searchDrivers).toHaveBeenCalledWith(1, searchText);
    });

    it('should map drivers to typeahead model', function (done) {
      var searchText = 'test',
        drivers = [{ id: 1, firstName: 'Bob', lastName: 'Ted', getFullName: function () { return this.firstName + ' ' + this.lastName; } }]
      carrierApi.searchDrivers.and.returnValue($q.when(drivers));
      component.searchDrivers(searchText).then(function (convertedDrivers) {
        expect(convertedDrivers).toEqual([{
          id: 1,
          name: 'Bob Ted'
        }]);
        done();
      });

      scope.$digest();
    });
  });

  describe('Function: getDrivers', function () {
    it('should fetch drivers', function () {
      var page = 2;
      carrierApi.fetchDrivers.and.returnValue($q.when());
      component.getDrivers();

      expect(carrierApi.fetchDrivers).toHaveBeenCalled();
    });
  });
});