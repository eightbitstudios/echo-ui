
describe('Component: driverGrid', function () {
  var component, $q, carrierApi, driverList, element;

  beforeEach(function () {
    module('app/common/components/driver-grid/driver-grid.template.html');
    module('echo.components.driverGrid', function ($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['fetchDrivers']));
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
    component = $componentController('driverGrid', null, {});
  }));

  describe('Function: searchDrivers', function () {
    it('should call carrier service to search drivers', function () {
      var searchText = 'test';

      carrierApi.fetchDrivers.and.returnValue($q.when());
      component.searchDrivers(searchText);

      expect(carrierApi.fetchDrivers).toHaveBeenCalledWith(1, 1, searchText);
    });

    it('should map drivers to typeahead model', function (done) {
      var searchText = 'test',
        drivers = [{ id: 1, firstName: 'Bob', lastName: 'Ted', getFullName: function () { return this.firstName + ' ' + this.lastName; } }]
      carrierApi.fetchDrivers.and.returnValue($q.when({data: drivers}));
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

  describe('Function: getDriversForPage', function () {
    it('should fetch drivers', function () {
      var page = 2;

      carrierApi.fetchDrivers.and.returnValue($q.when());
      component.getDriversForPage(page);

      expect(carrierApi.fetchDrivers).toHaveBeenCalledWith(1, page);
    });

    it('should set firstRecordNumber to 1 on page 1', function () {
      var page = 1,
        pagination = {
          currentPage: page,
          recordsPerPage: 10
        };

      carrierApi.fetchDrivers.and.returnValue($q.when({pagination: pagination}));
      component.getDriversForPage(page);

      expect(carrierApi.fetchDrivers).toHaveBeenCalledWith(1, page);
      scope.$digest();

      expect(component.firstRecordNumber).toBe(1);
    });

    it('should set firstRecordNumber to 11 on page 2', function () {
      var page = 2,
        pagination = {
          currentPage: page,
          recordsPerPage: 10
        };

      carrierApi.fetchDrivers.and.returnValue($q.when({pagination: pagination}));
      component.getDriversForPage(page);

      scope.$digest();

      expect(component.firstRecordNumber).toBe(11);
    });
  });
});