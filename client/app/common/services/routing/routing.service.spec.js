describe('Service: routingService', function () {
  'use strict';

  var $scope,
    $window,
    $state,
    userProfileService,
    cookieService,
    routesConfig,
    event,
    toState,
    from,
    routingService;

  beforeEach(function () {
    module('echo.services.routing', function ($provide) {
      $provide.value('$window', $window = { location: {}, angular: {callbacks: {} }});
      $provide.value('$state', $state = jasmine.createSpyObj('$state', ['go']));
      $provide.value('userProfileService', userProfileService = jasmine.createSpyObj('userProfileService', ['mapJwtToUser']));
      $provide.value('cookieService', cookieService = jasmine.createSpyObj('cookieService', ['getToken']));
      $provide.constant('routesConfig', routesConfig = {
        INDEX: {
          base: {
            name: 'base'
          },
          myCarriers: {
            name: 'myCarriers'
          },
          dashboard: {
            name: 'dashboard'
          }
        },
        LOGIN: {
          base: {
            redirectUrl: jasmine.createSpy('base')
          }
        }
      });
    });

    inject(function ($rootScope, _routingService_) {
      $scope = $rootScope.$new();
      routingService = _routingService_;
    });
    event = {
      preventDefault: jasmine.createSpy('preventDefault')
    };
    toState = {
      data: {},
      name: 'test'
    };
    from = {
      name: 'test'
    };
  });

  describe('nonauth routes', function () {
    it('should load page', function () {
      routingService.handleRouting(event, toState);
      expect($state.go).not.toHaveBeenCalled();
    });
  });

  describe('unauthorized user', function () {
    beforeEach(function () {
      toState.data.auth = true;
    });

    it('should redirect to login page', function () {
      routingService.handleRouting(event, toState, from);
      expect(routesConfig.LOGIN.base.redirectUrl).toHaveBeenCalled();
    });

    it('should prevent state from loading', function () {
      routingService.handleRouting(event, toState, from);
      expect(event.preventDefault).toHaveBeenCalled();
    });
  });
  describe('authorized user', function () {
    var user;

    beforeEach(function () {
      user = {
        isRepAdmin: jasmine.createSpy('isRepAdmin')
      };

      toState.data.auth = true;
      cookieService.getToken.and.returnValue(true);
      userProfileService.mapJwtToUser.and.returnValue(user);
    });

    it('should prevent user from routing to a page they dont have access to', function () {
      user.role = 'normalUser';
      toState.data.role = 'admin';
      routingService.handleRouting(event, toState, from);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    describe('role routing', function () {
      beforeEach(function() {
        toState.name = routesConfig.INDEX.base.name;
      });

      it('should reroute a carrier admin to their carrier dashboard', function () {
        user.isRepAdmin.and.returnValue(false);
        routingService.handleRouting(event, toState, from);
        expect($state.go).toHaveBeenCalled();
      });
      it('should reroute a rep admin to their carrier dashboard', function () {
        user.isRepAdmin.and.returnValue(true);
        routingService.handleRouting(event, toState, from);
        expect($state.go).toHaveBeenCalled();
      });
    });

  });
});
