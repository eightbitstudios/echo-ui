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

  describe('Function: toggleDriver', function () {
    it('should set driver if driver is unset', function () {
      var driver = { id: 1234 };
      component.selectedDriver = null;
      component.toggleDriver(driver);

      expect(component.selectedDriver).toBe(driver);
    });
  });

  describe('Function: toggleDriver 2', function () {
    it('should set driver to null if driver is set', function () {
      var driver = { id: 1234 };
      component.selectedDriver = driver;
      component.toggleDriver(driver);

      expect(component.selectedDriver).toBe(null);
    });
  });

  describe('Function: driver is selected', function () {
    it('should return true if the ids match', function () {
      var driver = { id: 1234 };
      component.selectedDriver = { id: 1234 };

      expect(component.isSelected(driver)).toBeTruthy();
    });

    it('should return false if the ids do not match', function () {
      var driver = { id: 1234 };
      component.selectedDriver = { id: 2345 };

      expect(component.isSelected(driver)).toBeFalsy();
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
