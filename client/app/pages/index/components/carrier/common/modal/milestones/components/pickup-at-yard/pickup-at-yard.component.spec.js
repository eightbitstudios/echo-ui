
describe('Component: pickupAtYard', function () {
  var component, $q, scope, $filter, carrierApi, DateTimePickerModel, load, carrierId, timeZones, assignedDriver;

  beforeEach(function () {
    module('pickup-at-yard.component.html');
    module('echo.components.modal.milestones.pickupAtYard', function ($provide) {
      $provide.value('$filter', $filter = jasmine.createSpy('$filter'));
      $provide.value('carrierApi', carrierApi = jasmine.createSpyObj('carrierApi', ['searchDrivers']));
      $provide.value('DateTimePickerModel', DateTimePickerModel = jasmine.createSpy('DateTimePickerModel'));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    load = {};
    carrierId = 1;
    timeZones = ['CST'];
    assignedDriver = {};

    component = $componentController('pickupAtYard', null, {
      load: load,
      carrierId: carrierId,
      timeZones: timeZones,
      assignedDriver: assignedDriver
    });
    component.$onInit();
  }));

  describe('Function: $onInit', function () {
    beforeEach(function () {
      spyOn(component, 'showFindDriver');
      component.$onInit();
    });

    it('should call showFindDriver', function () {
      expect(component.showFindDriver).toHaveBeenCalled();
    });
  });

  describe('Function: showFindDriver', function () {
    it('should call showFindDriver', function () {
      component.showFindDriver();
      expect(component.currentState).toEqual(component.modes.findDriver);
    });
  });

  describe('Function: showInviteNewDriver', function () {
    it('should call invite new driver', function () {
      component.showInviteNewDriver();
      expect(component.currentState).toEqual(component.modes.inviteNewDriver);
    });
  });

  describe('Function: setDriver', function () {
    it('should set assigned driver', function () {
      var driver = {
        id: 1
      };
      component.setDriver(driver);
      expect(component.assignedDriver).toEqual(driver);
    });
  });

  describe('Function: invitedNewDriver', function () {
    beforeEach(function () {
      spyOn(component, 'setDriver');
      spyOn(component, 'showFindDriver');
    });

    it('should call set driver', function () {
      var driver = {
        id: 1
      };
      component.invitedNewDriver(driver);
      expect(component.setDriver).toHaveBeenCalledWith(driver);
    });

    it('should show find driver', function () {
      component.invitedNewDriver();
      expect(component.showFindDriver).toHaveBeenCalled();
    });
  });

  describe('Function: invitedNewDriver', function () {
    beforeEach(function () {
      spyOn(component, 'setDriver');
      spyOn(component, 'showFindDriver');
    });

    it('should call set driver', function () {
      var driver = {
        id: 1
      };
      component.invitedNewDriver(driver);
      expect(component.setDriver).toHaveBeenCalledWith(driver);
    });

    it('should show find driver', function () {
      component.invitedNewDriver();
      expect(component.showFindDriver).toHaveBeenCalled();
    });
  });

  describe('Function: searchDrivers', function () {
    var searchDriversDefer;
    beforeEach(function () {
      searchDriversDefer = $q.defer();
      carrierApi.searchDrivers.and.returnValue(searchDriversDefer.promise);
    });

    it('should call search drivers endpoint', function () {
      var val = 'test';
      component.searchDrivers(val);
      expect(carrierApi.searchDrivers).toHaveBeenCalledWith(carrierId, val);
    });

    it('should map drivers', function (done) {
      var drivers = [{
        id: 1,
        name: 'Test',
        phone: '12345',
        tractorNumber: '545346'
      }];
      $filter.and.returnValue(function() {
        return drivers[0].name;
      });
      searchDriversDefer.resolve(drivers);
      component.searchDrivers().then(function (mappedDrivers) {
        expect(mappedDrivers).toEqual(drivers);
        done();
      });
      scope.$digest();
    });
  });
});