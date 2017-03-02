
describe('Component: verifyDriverModal', function () {
  var component, $q, modalActions, verifiedDriver, load, loadsApi, routesConfig, scope;

  beforeEach(function () {
    module('app/common/components/modal/verify-driver-modal/verify-driver-modal.template.html');
    module('echo.components.modal.verifyDriver', function ($provide) {
      $provide.value('loadsApi', loadsApi = jasmine.createSpyObj('loadsApi', ['reassignDriver']));
      $provide.value('routesConfig', routesConfig = {
        INDEX: {
          myCompanyDrivers: {
            name: 'drivers'
          }
        }
      });
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };
    verifiedDriver = {};
    modalActions = jasmine.createSpyObj('modalActions', ['close']);
    scope.$digest();

    load = {
      nextAction: {}
    };

    component = $componentController('verifyDriverModal', null, {
      modalActions: modalActions,
      load: load, verifiedDriver: verifiedDriver,
      equipment: {}, carrierId: 1
    });

    component.$onInit();
  }));

  describe('Function: showFindDriver', function () {
    it('should show find driver page', function () {
      component.showFindDriver();
      expect(component.currentState).toEqual(component.modes.findDriver);
    });
  });

  describe('Function: showInviteNewDriver', function () {
    it('should show invite driver page', function () {
      component.showInviteNewDriver();
      expect(component.currentState).toEqual(component.modes.inviteNewDriver);
    });
  });

  describe('Function: invitedNewDriver', function () {
    it('should set verified driver', function () {
      var driver = {
        id: 1
      };

      component.invitedNewDriver(driver);
      expect(component.verifiedDriver).toEqual(driver);
    });
  });

  describe('Function: noVerifiedDriver', function () {
    it('should have verified driver', function () {
      component.verifiedDriver = {
        id: 1
      };
      expect(component.noVerifiedDriver()).toBeFalsy();
    });

    it('should not have verified driver', function () {
      expect(component.noVerifiedDriver()).toBeTruthy();
    });
  });

  describe('Function: verifyDriver', function () {
    var reassignDriverDefer;

    beforeEach(function () {
      reassignDriverDefer = $q.defer();
      loadsApi.reassignDriver.and.returnValue(reassignDriverDefer.promise);
    });

    it('should call reassign driver', function () {
      load.loadNumber = 1234;
      verifiedDriver.id = 1;
      component.verifyDriver();
      expect(loadsApi.reassignDriver).toHaveBeenCalledWith(load.loadNumber, verifiedDriver.id);
    });

    it('should close modal if successful', function (done) {
      load.loadNumber = 1234;
      verifiedDriver.id = 1;
      component.verifyDriver();
      reassignDriverDefer.resolve();
    
      reassignDriverDefer.promise.then(function () {
        expect(modalActions.close).toHaveBeenCalledWith(true);
        done();
      });
      
      scope.$digest();
    });
  });
});