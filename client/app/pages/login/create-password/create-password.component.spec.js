
describe('Component: createPassword', function () {
  var component, $q, window, scope, createPassword, element, authenticationApi, state, routesConfig, createPasswordRes;

  beforeEach(function () {
    module('app/pages/login/create-password/create-password.template.html');
    module('echo.login.createPassword', function ($provide) {
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['createPassword']));
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$state', state = jasmine.createSpyObj('state', ['go']));
      $provide.value('$window', window = { location: null });
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

    component = $componentController('createPassword', null, {});
  }));

  describe('Function: createPassword', function () {
    it('should call create password service', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.token = '1234';
      component.username = 'test';
      component.oneLoginUserId = '1';
      authenticationApi.createPassword.and.returnValue($q.when());
      component.createPassword();

      expect(authenticationApi.createPassword).toHaveBeenCalledWith(component.username, component.oneLoginUserId, component.token, component.passwordChange);
    });

    it('should redirect to login page if the token is invalid', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.token = '1234';
      authenticationApi.createPassword.and.returnValue($q.reject());
      component.createPassword();

      scope.$digest();

      expect(state.go).toHaveBeenCalledWith(routesConfig.LOGIN.signIn.name, { invalidToken: true });
    });

    it('should redirect to dashboard when sucessful', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.token = '1234';
      authenticationApi.createPassword.and.returnValue($q.when());
      component.createPassword();

      scope.$digest();

      expect(window.location).toEqual(routesConfig.INDEX.base.url);
    });

    it('should toggle loading button', function () {
      component.passwordChange.newPassword = 'Test1234';
      component.passwordChange.confirmPassword = 'Test1234';
      component.token = '1234';
      authenticationApi.createPassword.and.returnValue($q.reject());
      component.createPassword();

      expect(component.showButtonLoading).toBeTruthy();
      scope.$digest();

      expect(component.showButtonLoading).toBeFalsy();
    });
  });
});