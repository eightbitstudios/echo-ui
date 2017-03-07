
describe('Component: signIn', function () {
  var component, $q, window, scope, state, userProfileService, element, authenticationApi, routesConfig, stateParams, errorsConfig, user;

  beforeEach(function () {
    module('sign-in.component.html');
    module('echo.login.signIn', function ($provide) {
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['signIn']));
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$state', state = jasmine.createSpyObj('state', ['go']));
      $provide.value('$window', window = { location: null, angular: {callbacks: {} }});
      $provide.value('userProfileService', userProfileService = jasmine.createSpyObj('userProfileService', ['mapJwtToUser']));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _routesConfig_, _errorsConfig_) {
    scope = $rootScope.$new();
    routesConfig = _routesConfig_;
    errorsConfig = _errorsConfig_;
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();

    userProfileService.mapJwtToUser.and.returnValue(user = jasmine.createSpyObj('user', ['isRepAdmin']));
    component = $componentController('signIn', null, {});
    component.$onInit();
  }));

  describe('Function: signIn', function () {

    beforeEach(function(){
      component.signInForm = {
        $valid: true
      };
    });

    it('should not call signIn service if form is not valid', function(){
      component.email = '';
      component.password = 'test';
      component.signInForm.$valid = false;
      component.signInHandler();

      expect(authenticationApi.signIn).not.toHaveBeenCalled();
    });

    it('should call signIn service', function () {
      component.email = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.when({
        access_token: '123'
      }));
      component.signInHandler();

      expect(authenticationApi.signIn).toHaveBeenCalledWith(component.email, component.password);
    });


    it('should set server error code on fail', function () {
      component.email = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.reject(400));
      component.signInHandler();

      scope.$digest();

      expect(component.serverError).toBe(400);
    });

    it('should reroute to forgot password if account is locked', function () {
      component.email = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.reject(errorsConfig.LOCKED));
      component.signInHandler();

      scope.$digest();

      expect(state.go).toHaveBeenCalledWith(routesConfig.LOGIN.forgotPassword.name);
    });

    it('should redirect to dashboard if the user is valid', function () {
      component.email = 'test';
      component.password = 'Test1234';
      user.isRepAdmin.and.returnValue(true);
      authenticationApi.signIn.and.returnValue($q.when({
        access_token: '123'
      }));
      component.signInHandler();

      expect(authenticationApi.signIn).toHaveBeenCalledWith(component.email, component.password);

      scope.$digest();

      expect(window.location).toEqual(routesConfig.INDEX.base.url);
    });

    it('should toggle loading button', function () {
      component.email = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.when({
        access_token: '123'
      }));
      component.signInHandler();

      expect(component.showButtonLoading).toBeTruthy();
      scope.$digest();

      expect(component.showButtonLoading).toBeFalsy();
    });
  });
});