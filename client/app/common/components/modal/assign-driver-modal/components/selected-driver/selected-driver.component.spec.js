
describe('Component: Selected Driver', function () {
  var component, scope, $q, driver, loadId, loadsApi;

  beforeEach(function () {
    module('app/common/components/modal/assign-driver-modal/components/selected-driver/selected-driver.template.html');
    module('echo.components.modal.assignDriver.selectedDriver', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchDriverStatusByLoadId']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    loadId = 1;
    driver = { id: 12345 };

    component = $componentController('selectedDriver', null, {
      loadId: loadId,
      driver: driver
    });
  }));

  describe('Function: $onInit', function () {
    it('should fetch driver status - driver available', function () {
      var deferred = $q.defer();
      loadsApi.fetchDriverStatusByLoadId.and.returnValue(deferred.promise);
      component.showStatus = true;
      component.$onInit();
      var isAvailable = true;
      deferred.resolve(isAvailable);

      scope.$digest();

      expect(loadsApi.fetchDriverStatusByLoadId).toHaveBeenCalledWith(loadId, driver.id);
      expect(component.isDriverAlreadyAssigned).toBe(false);
    });

    it('should fetch driver status - driver unavailable', function () {
      var deferred = $q.defer();
      loadsApi.fetchDriverStatusByLoadId.and.returnValue(deferred.promise);
      component.showStatus = true;
      component.$onInit();
      var isAvailable = false;
      deferred.resolve(isAvailable);

      scope.$digest();

      expect(loadsApi.fetchDriverStatusByLoadId).toHaveBeenCalledWith(loadId, driver.id);
      expect(component.isDriverAlreadyAssigned).toBe(true);
    });

    it('should not fetch status', function () {
      component.showStatus = false;
      component.$onInit();

      expect(loadsApi.fetchDriverStatusByLoadId).not.toHaveBeenCalled();
      expect(component.isDriverAlreadyAssigned).toBe(false);
    });
  });

});
