
describe('Component: forgotPassword', function () {
  var component, $q, window, scope, forgotPassword, element, authenticationApi, state, routesConfig;

  beforeEach(function () {
    module('app/pages/login/forgot-password/forgot-password.component.html');
    module('echo.login.forgotPassword', function ($provide) {
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['forgotPassword']));
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$state', state = jasmine.createSpyObj('state', ['go']));
      $provide.value('$window', window = { location: null, angular: {callbacks: {} }});
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

    component = $componentController('forgotPassword', null, {});
    component.$onInit();
  }));

  describe('Function: sendHandler', function () {

    beforeEach(function(){
      component.forgotPasswordForm = {
        $valid: true
      };
    });

    it('should not call forgot password service if email is not valid', function(){
      component.email = 'Test1234@gmail.com';
      component.forgotPasswordForm.$valid = false;
      component.sendHandler();

      expect(authenticationApi.forgotPassword).not.toHaveBeenCalled();
    });

    it('should call forgot password service', function () {
      component.email = 'Test1234@gmail.com';
      authenticationApi.forgotPassword.and.returnValue($q.when());
      component.sendHandler();

      expect(authenticationApi.forgotPassword).toHaveBeenCalledWith(component.email);
    });

    it('should redirect to login page on sucess', function () {
      component.email = 'Test1234@gmail.com';
      authenticationApi.forgotPassword.and.returnValue($q.when());
      component.sendHandler();

      expect(authenticationApi.forgotPassword).toHaveBeenCalledWith(component.email);

      scope.$digest();

      expect(state.go).toHaveBeenCalledWith(routesConfig.LOGIN.signIn.name);
    });

    it('should toggle loading button', function () {
     component.email = 'Test1234@gmail.com';
      authenticationApi.forgotPassword.and.returnValue($q.when());
      component.sendHandler();

      expect(component.showButtonLoading).toBeTruthy();
      scope.$digest();

      expect(component.showButtonLoading).toBeFalsy();
    });
  });
});