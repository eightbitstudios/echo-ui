
describe('Component: Assign Driver Modal', function () {
  var component, scope, $q, loadsApi, modalActions, load, carrierId;

  beforeEach(function () {
    module('app/common/components/modal/assign-driver-modal/assign-driver-modal.template.html');
    module('echo.components.modal.assignDriver', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['assignDriver', 'reassignDriver', 'unassignDriver']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    load = {
      loadNumber: 1234,
      driver: {
        id: 123456789
      }
    };

    modalActions = jasmine.createSpyObj('modalActions', ['close']);
    component = $componentController('assignDriverModal', null, {
      modalActions: modalActions,
      load: load,
      carrierId: carrierId
    });
  }));

  describe('Function: assignDriver', function () {

    it('should call assign driver', function () {
      var deferred = $q.defer();
      loadsApi.assignDriver.and.returnValue(deferred.promise);
      component.newDriver = { id: 123456 };
      component.assignDriver();
      deferred.resolve();

      scope.$digest();

      expect(loadsApi.assignDriver).toHaveBeenCalledWith(component.load.loadNumber, component.newDriver.id);
      expect(modalActions.close).toHaveBeenCalledWith(true);
    });

  });

  describe('Function: reassignDriver', function () {

    it('should call reassign driver', function () {
      var deferred = $q.defer();
      loadsApi.reassignDriver.and.returnValue(deferred.promise);
      component.newDriver = { id: 123456 };
      component.reassignDriver();
      deferred.resolve();

      scope.$digest();

      expect(loadsApi.reassignDriver).toHaveBeenCalledWith(component.load.loadNumber, component.newDriver.id);
      expect(modalActions.close).toHaveBeenCalledWith(true);
    });

  });

  describe('Function: unassignDriver', function () {

    it('should call unassign driver', function () {
      var deferred = $q.defer();
      loadsApi.unassignDriver.and.returnValue(deferred.promise);
      component.unassignDriver();
      deferred.resolve();

      scope.$digest();

      expect(loadsApi.unassignDriver).toHaveBeenCalledWith(component.load.loadNumber);
      expect(modalActions.close).toHaveBeenCalledWith(true);
    });

  });

  describe('Function: noNewDriver', function () {

    it('should return true with no new driver', function () {
      var result = component.noNewDriver();

      expect(result).toBeTruthy();
    });

    it('should return false with a new driver', function () {
      component.newDriver.id = 123456;
      var result = component.noNewDriver();

      expect(result).toBeFalsy();
    });

  });

  describe('Function: noAssignedDriver', function () {

    it('should return true with no assigned driver', function () {
      var result = component.noAssignedDriver();

      expect(result).toBeTruthy();
    });

    it('should return false with an assigned driver', function () {
      component.assignedDriver = { id: 123456 };
      var result = component.noAssignedDriver();

      expect(result).toBeFalsy();
    });

  });

  describe('Function: disableAssignButton', function () {
    beforeEach(function() {
      spyOn(component, 'noAssignedDriver');
      spyOn(component, 'noNewDriver');
    });

    it('should be enabled if a driver is assigned', function () {
      component.noAssignedDriver.and.returnValue(false);
      component.noNewDriver.and.returnValue(true);

      expect(component.disableAssignButton()).toBeFalsy();
    });

    it('should be enabled if new driver is selected', function () {
      component.noAssignedDriver.and.returnValue(true);
      component.noNewDriver.and.returnValue(false);
      component.submitControl = true;

      expect(component.disableAssignButton()).toBeFalsy();
    });

    it('should be disabled if on invite driver page', function () {
      component.noAssignedDriver.and.returnValue(true);
      component.noNewDriver.and.returnValue(false);
      component.state = component.states.newDriver;

      expect(component.disableAssignButton()).toBeTruthy();
    });
  });

  describe('Function: $onInit', function () {

    it('should set assigned driver to the load\'s driver', function () {
      component.$onInit();

      expect(component.assignedDriver.id).toBe(load.driver.id);
    });

  });
});
