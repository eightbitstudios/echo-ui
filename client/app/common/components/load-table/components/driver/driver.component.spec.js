
describe('Component: driver', function () {
  var component, $q, modalOpenDefer, driverChangedCallback, modalService, verifiedDriver, load, driverApi, carrierId, loadsApi, scope;

  beforeEach(function () {
    module('app/common/components/load-table/components/driver/driver.template.html');
    module('echo.components.loadTable.driver', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['fetchEquipmentByLoadId']));
      $provide.value('driverApi', driverApi = jasmine.createSpyObj('driverApi', ['verifyDriverByPhone']));
      $provide.value('modalService', modalService = jasmine.createSpyObj('modalService', ['open']));
      $provide.value('loadTypesEnum', {});
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    verifiedDriver = {};
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
  }));

  describe('Function: showVerifyDriverModal', function () {
    var verifyDriverDefer,
      equipmentDefer;

    beforeEach(function () {
      verifyDriverDefer = $q.defer();
      equipmentDefer = $q.defer();
      driverApi.verifyDriverByPhone.and.returnValue(verifyDriverDefer.promise);
      loadsApi.fetchEquipmentByLoadId.and.returnValue(equipmentDefer.promise);
    });

    it('should call verify driver', function () {
      component.showVerifyDriverModal();
      expect(driverApi.verifyDriverByPhone).toHaveBeenCalledWith(load.loadGuid, carrierId, load.driver.phone);
    });

    it('should call equipment', function () {
      component.showVerifyDriverModal();
      expect(loadsApi.fetchEquipmentByLoadId).toHaveBeenCalledWith(load.loadNumber);
    });
    describe('verify modal', function () {
      beforeEach(function () {
        equipmentDefer.resolve();
        verifyDriverDefer.resolve();
      });
      it('should open modal', function (done) {
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function () {
          expect(modalService.open).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should call driver callback on close', function (done) {
        modalOpenDefer.resolve(true);
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function () {
          expect(driverChangedCallback).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should not call driver callback on close', function (done) {
        modalOpenDefer.resolve(false);
        component.showVerifyDriverModal();

        scope.$digest();

        verifyDriverDefer.promise.then(function () {
          expect(driverChangedCallback).not.toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });
    });
  });

  describe('Function: showAssignDriverModal', function () {
    var equipmentDefer;

    beforeEach(function () {
      equipmentDefer = $q.defer();
      loadsApi.fetchEquipmentByLoadId.and.returnValue(equipmentDefer.promise);
    });

    it('should call equipment', function () {
      component.showAssignDriverModal();
      expect(loadsApi.fetchEquipmentByLoadId).toHaveBeenCalledWith(load.loadNumber);
    });

    describe('verify modal', function () {
      beforeEach(function () {
        equipmentDefer.resolve();
      });

      it('should open modal', function (done) {
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function () {
          expect(modalService.open).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should call driver callback on close', function (done) {
        modalOpenDefer.resolve(true);
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function () {
          expect(driverChangedCallback).toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });

      it('should not call driver callback on close', function (done) {
        modalOpenDefer.resolve(false);
        component.showAssignDriverModal();

        scope.$digest();

        equipmentDefer.promise.then(function () {
          expect(driverChangedCallback).not.toHaveBeenCalled();
          done();
        });

        scope.$digest();
      });
    });

  });
});