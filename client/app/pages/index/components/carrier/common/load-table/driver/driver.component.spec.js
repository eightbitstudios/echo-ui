describe('Component: driver', function() {
  var component, $q, modalOpenDefer, driverChangedCallback, loadTypeConstants, actionConstants,
    modalService, verifiedDriver, load, driverApi, carrierId, loadsApi, scope;

  beforeEach(function() {
    module('driver.component.html');
    module('echo.components.loadTable.driver', function($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchEquipmentByLoadId']));
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['verifyDriverByPhone']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
    });
  });

  beforeEach(inject(function($rootScope, _$q_, $compile, $componentController, _loadTypeConstants_, _actionConstants_) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    verifiedDriver = {};
    loadTypeConstants = _loadTypeConstants_;
    actionConstants = _actionConstants_;
    scope.$digest();

    load = {
      loadNumber: 1234,
      loadGuid: 41234,
      nextAction: {},
      driver: {
        phone: '2345'
      }
    };
    modalOpenDefer = $q.defer();
    driverChangedCallback = jasmine.createSpy('driverChangedCallback');
    modalService.open.and.returnValue({
      result: modalOpenDefer.promise
    });
    carrierId = 1;
    component = $componentController('driver', null, {
      load: load,
      driverChangedCallback: driverChangedCallback,
      carrierId: carrierId
    });
    component.$onInit();
  }));

  describe('Function: $onInit', function() {
    it('should be disabled if load is unbilled', function() {
      component.loadType = loadTypeConstants.UNBILLED;
      component.$onInit();
      expect(component.isDisabled).toBeTruthy();
    });

    it('should be disabled if load is multistop', function() {
      component.loadType = loadTypeConstants.ACTIVE;
      component.isMultiStop = true;
      component.$onInit();
      expect(component.isDisabled).toBeTruthy();
    });

    it('should be disabled if last action is report unloaded', function() {
      component.loadType = loadTypeConstants.ACTIVE;
      load.nextAction.lastAction = actionConstants.LAST_ACTION.REPORTED_UNLOADED.value;
      component.isMultiStop = true;
      component.$onInit();
      expect(component.isDisabled).toBeTruthy();
    });
  });

  describe('Function: showVerifyDriverModal', function() {
    var verifyDriverDefer,
      equipmentDefer;

    beforeEach(function() {
      verifyDriverDefer = $q.defer();
      equipmentDefer = $q.defer();
      driverApi.verifyDriverByPhone.and.returnValue(verifyDriverDefer.promise);
      loadsApi.fetchEquipmentByLoadId.and.returnValue(equipmentDefer.promise);
    });

    it('should call verify driver', function() {
      component.showVerifyDriverModal();
      expect(driverApi.verifyDriverByPhone).toHaveBeenCalledWith(carrierId, load.driver.phone);
    });

    it('should call equipment', function() {
      component.showVerifyDriverModal();
      expect(loadsApi.fetchEquipmentByLoadId).toHaveBeenCalledWith(load.loadNumber);
    });
    describe('verify modal', function() {
      beforeEach(function() {
        equipmentDefer.resolve();
        verifyDriverDefer.resolve();
      });
      it('should open modal', function(done) {
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function() {
          expect(modalService.open).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should call driver callback on close', function(done) {
        modalOpenDefer.resolve(true);
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function() {
          expect(driverChangedCallback).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should not call driver callback on close', function(done) {
        modalOpenDefer.resolve(false);
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function() {
          expect(driverChangedCallback).not.toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });
    });
  });

  describe('Function: showAssignDriverModal', function() {
    var equipmentDefer;

    beforeEach(function() {
      equipmentDefer = $q.defer();
      loadsApi.fetchEquipmentByLoadId.and.returnValue(equipmentDefer.promise);
    });

    it('should call equipment', function() {
      component.showAssignDriverModal();
      expect(loadsApi.fetchEquipmentByLoadId).toHaveBeenCalledWith(load.loadNumber);
    });

    describe('verify modal', function() {
      beforeEach(function() {
        equipmentDefer.resolve();
      });

      it('should open modal', function(done) {
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function() {
          expect(modalService.open).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should call driver callback on close', function(done) {
        modalOpenDefer.resolve(true);
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function() {
          expect(driverChangedCallback).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should not call driver callback on close', function(done) {
        modalOpenDefer.resolve(false);
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function() {
          expect(driverChangedCallback).not.toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });
    });

  });
});