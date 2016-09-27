describe('Decorator: RouteSettings', function () {
  'use strict';

  var $scope,
    RolesEnum,
    RouteSettingsDecorator;

  beforeEach(function () {
    module('echo.index.decorators.routeSettings', function ($provide) {
      $provide.constant('RolesEnum', RolesEnum = {
        ECHO_REP: 'ECHO'
      });
    });

    inject(function ($rootScope, _RouteSettingsDecorator_) {
      $scope = $rootScope.$new();
      RouteSettingsDecorator = _RouteSettingsDecorator_;
    });
  });

  describe('Function: showDefaultContainer', function() {
    it('should show default container', function() {
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.showDefaultContainer();
      expect(routeSettings.whiteContainer).toBeFalsy();
    });
  });

  describe('Function: showWhiteContainer', function() {
    it('should show white container', function() {
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.showWhiteContainer();
      expect(routeSettings.whiteContainer).toBeTruthy();
    });
  });

  describe('Function: setTabBarHidden', function() {
    it('should hide tab bar', function() {
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.setTabBarHidden();
      expect(routeSettings.hideTabBar).toBeTruthy();
    });
  });
  
  describe('Function: echoRepOnly', function() {
    it('should restrict route to echo reps', function() {
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.echoRepOnly();
      expect(routeSettings.role).toEqual(RolesEnum.ECHO_REP);
    });
  });

  describe('Function: authenticationRequired', function() {
    it('should restrict route', function() {
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.authenticationRequired();
      expect(routeSettings.auth).toBeTruthy();
    });
  });

  describe('Function: routeName', function() {
    it('should restrict route', function() {
      var name = 'test';
      var routeSettings = new RouteSettingsDecorator();
      routeSettings.routeName(name);
      expect(routeSettings.name).toEqual(name);
    });
  });
});
