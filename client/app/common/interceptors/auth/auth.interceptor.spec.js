describe('Interceptor: authInterceptor', function() {
  'use strict';

  var $scope,
    $q,
    window,
    cookieService,
    routesConfig,
    errorsConfig,
    apiConfig,
    authenticationApi,
    authInterceptor,
    httpBufferService;

  beforeEach(function() {
    module('echo.interceptors.auth', function($provide) {
      
      $provide.value('$window', window = { location: {}, angular: {callbacks: {} }});

      $provide.value('$base64', jasmine.createSpyObj('$base64', ['encode', 'decode']));
      $provide.value('cookieService', cookieService = jasmine.createSpyObj('cookieService', ['getToken', 'getRefreshToken', 'clearToken', 'clearRefreshToken']));
      $provide.value('authenticationApi', authenticationApi = jasmine.createSpyObj('authenticationApi', ['refresh']));
      $provide.value('httpBufferService', httpBufferService = jasmine.createSpyObj('httpBufferService', ['isBufferEmpty', 'retryAllRequest', 'add']));

      $provide.constant('apiConfig', apiConfig = {
        refresh: 'refresh',
        singIn: 'signIn',
        other: 'other'
      });
      $provide.constant('errorsConfig', errorsConfig = {
        EXPIRED_TOKEN: 401
      });
      $provide.constant('routesConfig', routesConfig = {
        INDEX: {
          base: {
            name: 'base'
          },
        },
        LOGIN: {
          base: {
            redirectUrl: jasmine.createSpy('base')
          }
        }
      });
    });

    inject(function($rootScope, _$q_, _authInterceptor_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      authInterceptor = _authInterceptor_;
    });
  });

  describe('Function: request', function() {
    var config;
    beforeEach(function() {
      config = {
        url: ''
      };

      cookieService.getToken.and.returnValue('token');
      cookieService.getRefreshToken.and.returnValue('refresh');
    });

    it('should send refresh token when calling the refresh endpoint', function() {
      config.url = apiConfig.refresh;
      expect(authInterceptor.request(config).headers.Authorization).toEqual('Bearer refresh');
    });

    it('should send auth token when calling the authorized endpoints', function() {
      config.url = apiConfig.other;
      expect(authInterceptor.request(config).headers.Authorization).toEqual('Bearer token');
    });

    it('should not send token if calling sign in endpoint', function() {
      config.url = apiConfig.signIn;
      expect(authInterceptor.request(config).headers.Authorization).toBeUndefined();
    });
  });

  describe('Function: responseError', function() {
    var rejection;

    beforeEach(function() {
      rejection = {
        data: {
          code: ''
        }
      };
      cookieService.getRefreshToken.and.returnValue('refresh');
    });

    it('should bypass refresh token if status code is not 401', function() {
      authInterceptor.responseError(rejection);
      expect(authenticationApi.refresh).not.toHaveBeenCalled();
    });

    describe('refresh token', function() {
      var refreshDefer;
      beforeEach(function() {
        refreshDefer = $q.defer();
        authenticationApi.refresh.and.returnValue(refreshDefer.promise);
        rejection.data.code = errorsConfig.EXPIRED_TOKEN;
        httpBufferService.isBufferEmpty.and.returnValue(true);
      });

      it('should call refresh token endpoint', function() {
        authInterceptor.responseError(rejection);
        expect(authenticationApi.refresh).toHaveBeenCalled();
      });

      it('should retry api calls if successful', function(done) {
        refreshDefer.resolve();
        authInterceptor.responseError(rejection);
        refreshDefer.promise.then(function() {
          expect(httpBufferService.retryAllRequest).toHaveBeenCalled();
          done();
        });
        $scope.$digest();
      });

      it('should redirect to login page if refresh token failed', function(done) {
        refreshDefer.reject();
        authInterceptor.responseError(rejection);
        $scope.$digest();
        refreshDefer.promise.catch(function() {
          expect(cookieService.clearToken).toHaveBeenCalled();
          expect(cookieService.clearRefreshToken).toHaveBeenCalled();
          expect(routesConfig.LOGIN.base.redirectUrl).toHaveBeenCalled();
          done();
        });

        $scope.$digest();
      });
    });
  });
});