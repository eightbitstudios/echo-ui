
describe('Component: Usage', function () {
  var component, scope, $q, user;

  beforeEach(function () {
    module('usage.component.html');
    module('echo.components.usage', function ($provide) {});
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

    component = $componentController('usage', null, {
      user: user
    });
  }));

  describe('Function: hasUserLoggedIn', function () {

    it('should return false if user never logged in', function () {
      component.user.lastLogin = 'Never';
      var result = component.hasUserLoggedIn();

      expect(result).toBe(false);
    });

    it('should return true if user has logged in ever', function () {
      component.user.lastLogin = 'Dec 27, 2016';
      var result = component.hasUserLoggedIn();

      expect(result).toBe(true);
    });

  });
});
