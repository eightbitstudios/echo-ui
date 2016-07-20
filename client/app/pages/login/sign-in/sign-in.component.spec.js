
describe('Component: signIn', function () {
  var component, $q, window, scope, element, authenticationApi, routesConfig, stateParams;

  beforeEach(function () {
    module('app/pages/login/sign-in/sign-in.template.html');
    module('echo.login.signIn', function ($provide) {
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['signIn']));
      $provide.value('$stateParams', stateParams = {});
      $provide.value('$window', window = { location: null });
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

    component = $componentController('signIn', null, {});
  }));

  describe('Function: signIn', function () {
    it('should call signIn service', function () {
      component.username = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.when());
      component.signInHandler();

      expect(authenticationApi.signIn).toHaveBeenCalledWith(component.username, component.password);
    });

    it('should redirect to dashboard if the user is valid', function () {
      component.username = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.when());
      component.signInHandler();

      expect(authenticationApi.signIn).toHaveBeenCalledWith(component.username, component.password);

      scope.$digest();

      expect(window.location).toEqual(routesConfig.INDEX.myCarriers.url);
    });

    it('should toggle loading button', function () {
      component.username = 'test';
      component.password = 'Test1234';
      authenticationApi.signIn.and.returnValue($q.when());
      component.signInHandler();

      expect(component.showButtonLoading).toBeTruthy();
      scope.$digest();

      expect(component.showButtonLoading).toBeFalsy();
    });
  });
});