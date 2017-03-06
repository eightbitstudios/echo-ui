
describe('Component: Resend Invite', function () {
  var component, scope, $q, user, portalUserApi;

  beforeEach(function () {
    module('app/common/components/resend-invite/resend-invite.component.html');
    module('echo.components.resendInvite', function ($provide) {
      $provide.value('portalUserApi', portalUserApi = jasmine.createSpyObj('portalUserApi', ['resendInviteToPortalUserById']));
    });
  });

  beforeEach(inject(function ($rootScope, $compile, $componentController, _$q_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;

    user = {
      id: 1,
      invitationStatus: 'Invited on Sep 20, 2016'
    };

    component = $componentController('resendInvite', null, {
      user: user
    });
  }));

  describe('Function: resendInvite', function () {

    it('should show success message and update date on success', function () {
      var testData = {invitationStatus: 'Invited on Dec 24, 2016'};

      var deferred = $q.defer();
      portalUserApi.resendInviteToPortalUserById.and.returnValue(deferred.promise);
      deferred.resolve(testData);
      component.resendInvite();

      scope.$digest();

      expect(component.showSuccess).toBe(true);
      expect(component.showError).toBe(false);
      expect(component.showDefaultError).toBe(false);
      expect(component.disableSubmit).toBe(true);
      expect(component.user.invitationStatus).toBe(testData.invitationStatus);
    });

    it('should show pre-defined error message on error', function () {
      var errorCode = 404112;
      var deferred = $q.defer();
      portalUserApi.resendInviteToPortalUserById.and.returnValue(deferred.promise);
      deferred.reject(errorCode);
      component.$onInit();
      component.resendInvite();

      scope.$digest();

      expect(component.showSuccess).toBe(false);
      expect(component.showError).toBe(true);
      expect(component.showDefaultError).toBe(false);
      expect(component.disableSubmit).toBe(true);
      expect(component.errorCode).toBe(errorCode);
      expect(component.user.invitationStatus).toBe(user.invitationStatus);
    });

    it('should show default error message on error', function () {
      var errorCode = 404113;
      var deferred = $q.defer();
      portalUserApi.resendInviteToPortalUserById.and.returnValue(deferred.promise);
      deferred.reject(errorCode);
      component.$onInit();
      component.resendInvite();

      scope.$digest();

      expect(component.showSuccess).toBe(false);
      expect(component.showError).toBe(true);
      expect(component.showDefaultError).toBe(true);
      expect(component.disableSubmit).toBe(false);
      expect(component.errorCode).toBe(errorCode);
      expect(component.user.invitationStatus).toBe(user.invitationStatus);
    });

  });
});
