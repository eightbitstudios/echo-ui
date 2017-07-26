describe('Component: Unassigned Driver', function() {
  var component, scope, $q, loadId, carrierId, carrierApi;

  beforeEach(function() {
    module('unassigned-driver.component.html');
    module('echo.components.modal.assignDriver.unassignedDriver', function($provide) {
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['searchDrivers']));
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    loadId = 1;
    carrierId = 123;

    component = $componentController('unassignedDriver', null, {
      loadId: loadId,
      carrierId: carrierId,
      inviteNewDriverCallback: jasmine.createSpy(),
      selectedDriverCallback: jasmine.createSpy()
    });

    component.$onInit();
  }));

  describe('Function: searchDrivers', function() {
    it('should fetch the list of drivers', function() {
      var deferred = $q.defer();
      carrierApi.searchDrivers.and.returnValue(deferred.promise);
      var val = 'test';
      var drivers = [{
        id: 1,
        firstName: 'Test1',
        lastName: 'Test1',
        phone: '8005551234'
      }, {
        id: 2,
        firstName: 'Test2',
        lastName: 'Test2',
        phone: '8005551235'
      }, {
        id: 3,
        firstName: 'Test3',
        lastName: 'Test3',
        phone: '8005551236'
      }];

      component.searchDrivers(val).then(function(result) {
        expect(carrierApi.searchDrivers).toHaveBeenCalledWith(carrierId, val);
        expect(result.length).toBe(3);
        expect(result[0].id).toBe(drivers[0].id);
        expect(result[0].name).toBe(drivers[0].firstName + ' ' + drivers[0].lastName);
        expect(result[0].phone).toBe(drivers[0].phone);
        expect(result[1].id).toBe(drivers[1].id);
        expect(result[1].name).toBe(drivers[1].firstName + ' ' + drivers[1].lastName);
        expect(result[1].phone).toBe(drivers[1].phone);
        expect(result[2].id).toBe(drivers[2].id);
        expect(result[2].name).toBe(drivers[2].firstName + ' ' + drivers[2].lastName);
        expect(result[2].phone).toBe(drivers[2].phone);
      });
      deferred.resolve(drivers);

      scope.$digest();
    });
  });

  describe('Function: removeDriverCallback', function() {
    it('should call callback and set state', function() {
      component.removeDriverCallback();

      expect(component.selectedDriverCallback).toHaveBeenCalledWith({
        driver: null
      });
      expect(component.state).toBe(component.states.driverList);
    });
  });

  describe('Function: onSelectCallback', function() {
    it('should not select driver if one isnt provided', function() {
      component.onSelectCallback();

      expect(component.selectedDriverCallback).not.toHaveBeenCalled();
    });

    it('should call callback and set state', function() {
      var driver = {
        id: 1234567
      };
      component.onSelectCallback(driver);

      expect(component.selectedDriverCallback).toHaveBeenCalledWith({
        driver: driver
      });
      expect(component.state).toBe(component.states.selectedDriver);
    });
  });

  describe('Function: $onInit', function() {
    it('should set initial states valid driver', function() {
      var driver = {
        id: 1234567
      };
      component.newDriver = driver;
      component.$onInit();

      expect(component.state).toBe(component.states.selectedDriver);
      expect(component.selectedDriver).toBe(driver);
    });

    it('should do nothing with invalid driver', function() {
      component.$onInit();

      expect(component.state).not.toBe(component.states.selectedDriver);
    });
  });

});