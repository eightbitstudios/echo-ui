
describe('Component: Portal User Profile', function () {
  var component, scope, $q, component, carrierId, portalUser, showLoading, isCarrierAdmin, userUpdatedHandler, portalUserApi;

  beforeEach(function () {
    module('app/common/components/portal-user-profile/portal-user-profile.template.html');
    module('echo.components.portalUserProfile', function ($provide) {
      $provide.value('portalUserApi', portalUserApi = jasmine.createSpyObj('portalUserApi', ['upsertPortalUser', 'deactivatePortalUserById']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
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
  }));

  describe('Function: saveChangesHandler', function () {

    it('should save profile', function () {
      portalUserApi.upsertPortalUser.and.returnValue($q.defer().promise);
      component.saveChangesHandler(component.portalUser);

      expect(portalUserApi.upsertPortalUser).toHaveBeenCalledWith(component.portalUser);
    });

    it('should call profile update handler if user edited a profile', function () {
      portalUserApi.upsertPortalUser.and.returnValue($q.when());
      component.isNewProfile = false;
      component.saveChangesHandler();

      scope.$digest();

      expect(component.userUpdatedHandler).toHaveBeenCalled();
    });

    it('should not call profile update handler if a new profile', function () {
      portalUserApi.upsertPortalUser.and.returnValue($q.when());
      component.isNewProfile = true;
      component.saveChangesHandler();

      scope.$digest();

      expect(component.userUpdatedHandler).not.toHaveBeenCalled();
    });

    it('should set server error message on failure', function () {
      var error = 'error message';
      portalUserApi.upsertPortalUser.and.returnValue($q.reject(error));
      component.saveChangesHandler();

      scope.$digest();

      expect(component.serverError).toEqual(error);
    });
  });
});