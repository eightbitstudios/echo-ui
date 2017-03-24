describe('Component: Portal User Profile', function() {
  var component, scope, $q, component, carrierId, portalUser, showLoading, isCarrierAdmin, userUpdatedHandler, portalUserApi;

  beforeEach(function() {
    module('portal-user-profile.component.html');
    module('echo.components.portalUserProfile', function($provide) {
      $provide.value('portalUserApi', portalUserApi = jasmine.createSpyObj('portalUserApi', ['upsertPortalUser', 'deactivatePortalUserById']));
    });
  });

  beforeEach(inject(function($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    carrierId = 1;
    portalUser = {};
    showLoading = false;
    isCarrierAdmin = false;

    userUpdatedHandler = jasmine.createSpy('userUpdatedHandler');
    component = $componentController('portalUserProfile', null, {
      portalUser: portalUser,
      userUpdatedHandler: jasmine.createSpy('userUpdatedHandler'),
      showLoading: showLoading,
      isCarrierAdmin: isCarrierAdmin
    });
    component.$onInit();
  }));

  describe('Function: $onInit', function() {
    it('should remove international code', function() {
      portalUser.phone = '13335555555';
      component.$onInit();

      expect(component.portalUser.phone).toEqual('3335555555');
    });
  });

  describe('Function: saveChangesHandler', function() {

    it('should save profile', function() {
      component.carrierId = 24;
      portalUserApi.upsertPortalUser.and.returnValue($q.defer().promise);
      component.saveChangesHandler(component.portalUser);

      expect(portalUserApi.upsertPortalUser).toHaveBeenCalledWith(component.portalUser);
    });

    it('should call profile update handler if user edited a profile', function() {
      portalUserApi.upsertPortalUser.and.returnValue($q.when());
      component.isNewProfile = false;
      component.saveChangesHandler();

      scope.$digest();

      expect(component.userUpdatedHandler).toHaveBeenCalled();
    });

    it('should not call profile update handler if a new profile', function() {
      portalUserApi.upsertPortalUser.and.returnValue($q.when());
      component.isNewProfile = true;
      component.saveChangesHandler();

      scope.$digest();

      expect(component.userUpdatedHandler).not.toHaveBeenCalled();
    });

    it('should set server error message on failure', function() {
      var error = 'error message';
      portalUserApi.upsertPortalUser.and.returnValue($q.reject(error));
      component.saveChangesHandler();

      scope.$digest();

      expect(component.serverError).toEqual(error);
    });

    it('should not set carrier id if it isnt defined', function() {
      component.carrierId = null;
      portalUser.carrierId = 4;
      portalUserApi.upsertPortalUser.and.returnValue($q.defer().promise);
      component.saveChangesHandler(component.portalUser);

      expect(portalUser.carrierId).toBe(4);
    });
  });

  describe('Function: removeUserHandler', function() {

    it('should call service to deactivate user', function() {
      portalUserApi.deactivatePortalUserById.and.returnValue($q.defer().promise);
      component.removeUserHandler(component.portalUser);

      expect(portalUserApi.deactivatePortalUserById).toHaveBeenCalledWith(component.portalUser);
    });

    it('should call user update handler on success', function() {
      portalUserApi.deactivatePortalUserById.and.returnValue($q.when());
      component.removeUserHandler(component.portalUser);
      scope.$digest();
      expect(component.userUpdatedHandler).toHaveBeenCalled();
    });

    it('should set server error message on failure', function() {
      var error = 'error message';
      portalUserApi.deactivatePortalUserById.and.returnValue($q.reject(error));
      component.removeUserHandler();

      scope.$digest();

      expect(component.serverError).toEqual(error);
    });
  });

  describe('Function: toggleConfirmation', function() {

    it('should toggle showConfirmation', function() {
      component.toggleConfirmation();
      expect(component.showConfirmation).toBeTruthy();
    });
  });

  describe('Function: checkIfNewProfile', function() {

    it('should check if it is a new profile', function() {
      component.checkIfNewProfile({
        portalUser: {
          currentValue: true
        }
      });

      expect(component.isNewProfile).toBeTruthy();
    });

    it('should not set new profile flag if portal user is not defined', function() {
      component.checkIfNewProfile({});

      expect(component.isNewProfile).toBeUndefined();
    });
  });
});