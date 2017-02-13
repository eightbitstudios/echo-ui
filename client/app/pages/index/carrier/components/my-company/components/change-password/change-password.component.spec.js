
describe('Component: changePassword', function () {
  var component, $q, window, scope, changePassword, element, authenticationApi, state, routesConfig, changePasswordRes;

  beforeEach(function () {
    module('app/pages/index/carrier/components/my-company/components/change-password/change-password.template.html');
    module('echo.index.carrier.myCompany.userProfile.changePassword', function ($provide) {
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['changePassword']));
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$state', state = jasmine.createSpyObj('state', ['go']));
      $provide.value('$window', window = { location: null, angular: {callbacks: {} }});
      $provide.value('PasswordChangeModel', jasmine.createSpy('PasswordChangeModel'));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _routesConfig_) {
    scope = $rootScope.$new();
    routesConfig = _routesConfig_;
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    component = $componentController('changePassword', null, {});
    component.$onInit();
  }));

  describe('Function: changePasswordHandler', function () {

    beforeEach(function () {
      component.changePasswordForm = {
        $valid: true
      };
    });

    it('should call change password service', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.userId = '1';
      authenticationApi.changePassword.and.returnValue($q.when());
      component.changePasswordHandler();

      expect(authenticationApi.changePassword).toHaveBeenCalledWith(component.userId, component.passwordChange);
    });

    it('should not call change password service if change password form is invalid', function () {
      component.changePasswordForm.$valid = false;
      component.changePasswordHandler();

      expect(authenticationApi.changePassword).not.toHaveBeenCalled();
    });

    it('should set server errors', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.userId = '1';
      var error = 400;
      authenticationApi.changePassword.and.returnValue($q.reject(error));
      component.changePasswordHandler();

      scope.$digest();

      expect(component.serverError).toBe(error);
    });

    it('should toggle loading button', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.userId = '1';
      authenticationApi.changePassword.and.returnValue($q.when());
      component.changePasswordHandler();

      expect(component.showButtonLoading).toBeTruthy();
      scope.$digest();

      expect(component.showButtonLoading).toBeFalsy();
    });
  });

  describe('Function: clearServerErrors', function () {

    it('should clear out server error code', function () {
      component.serverError = 400;
      component.clearServerErrors();
      scope.$digest();

      expect(component.serverError).toBeNull();
    });
  });
});