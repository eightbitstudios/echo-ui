
describe('Component: Unassigned Driver List', function () {
  var component, scope, $q, loadId, carrierId, loadsApi;

  beforeEach(function () {
    module('unassigned-driver-list.component.html');
    module('echo.components.modal.assignDriver.unassignedDriverList', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchUnassignedDriversByLoadId']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    loadId = 1;
    carrierId = 123;

    component = $componentController('unassignedDriverList', null, {
      loadId: loadId,
      carrierId: carrierId
    });
  }));

  describe('Function: selectDriver', function () {
    it('should set driver', function () {
      var driver = { id: 1234 };
      component.selectDriver(driver);

      expect(component.selectedDriver).toBe(driver);
    });
  });

  describe('Function: deselectDriver', function () {
    it('should set driver to null', function () {
      component.deselectDriver();

      expect(component.selectedDriver).toBe(null);
    });
  });

  describe('Function: $onInit', function () {
    it('should fetch list of drivers', function () {
      var deferred = $q.defer();
      loadsApi.fetchUnassignedDriversByLoadId.and.returnValue(deferred.promise);

      var data = {
        drivers: [
          {
            id: 1,
            firstName: 'Test1',
            lastName: 'Test1',
            phone: '8005551234'
          },
          {
            id: 2,
            firstName: 'Test2',
            lastName: 'Test2',
            phone: '8005551235'
          },
          {
            id: 3,
            firstName: 'Test3',
            lastName: 'Test3',
            phone: '8005551236'
          }
        ]
      };

      component.$onInit();

      deferred.resolve(data);
      scope.$digest();

      expect(component.drivers).toBe(data.drivers);
      expect(loadsApi.fetchUnassignedDriversByLoadId).toHaveBeenCalledWith(loadId, carrierId);
    });
  });

});
