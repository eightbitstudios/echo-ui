
describe('Component: Load Driver', function () {
  var component, scope, $q, carrierId, loadId;

  beforeEach(function () {
    module('load-driver.component.html');
    module('echo.components.modal.assignDriver.loadDriver', function () {});
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    loadId = 123456789;

    component = $componentController('loadDriver', null, {
      loadId: loadId,
      carrierId: carrierId
    });

    component.$onInit();
  }));

  describe('Function: cancelNewDriver', function () {
    it('should set unassigned driver state', function () {
      component.cancelNewDriver();

      expect(component.state).toBe(1);
    });
  });

  describe('Function: inviteNewDriver', function () {
    it('should set new driver state', function () {
      component.inviteNewDriver();

      expect(component.state).toBe(2);
    });
  });

  describe('Function: changeDriver', function () {
    it('should set unassigned driver state', function () {
      component.changeDriver();

      expect(component.state).toBe(1);
    });
  });

  describe('Function: newDriverCreated', function () {
    it('should set unassigned driver state and set new driver', function () {
      var driver = {
        id: 12345
      };

      component.newDriverCreated(driver);

      expect(component.state).toBe(1);
      expect(component.newDriver.id).toBe(driver.id);
    });
  });

  describe('Function: setNewDriver', function () {
    it('should set new driver', function () {
      var driver = {
        id: 12345
      };

      component.setNewDriver(driver);

      expect(component.newDriver.id).toBe(driver.id);
    });
  });

  describe('Function: $onInit', function () {
    it('should initialize the controller with valid driver', function () {
      var driver = {
        id: 12345
      };
      component.assignedDriver = driver;

      component.$onInit();

      expect(component.state).toBe(3);
    });

    it('should initialize the controller with invalid driver', function () {
      component.$onInit();

      expect(component.state).toBe(1);
    });
  });

});
