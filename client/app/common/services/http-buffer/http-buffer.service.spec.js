describe('Service: httpBuffer', function() {
  'use strict';

  var $scope,
    $http,
    $q,
    requestDefer,
    httpBufferService;

  beforeEach(function() {
    module('echo.services.httpBuffer', function($provide) {
      $provide.value('$http', $http = jasmine.createSpy('$http'));
    });

    inject(function($rootScope, _$q_, _httpBufferService_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      httpBufferService = _httpBufferService_;
      requestDefer = $q.defer();
      $http.and.returnValue(requestDefer.promise);
    });
  });

  describe('Function: add', function() {
    it('should add request to buffer', function() {
      var config = {
          id: 1
        },
        deferred = $q.when;

      httpBufferService.add(config, deferred);

      expect(httpBufferService.isBufferEmpty()).toBeFalsy();
    });
  });

  describe('Function: isBufferEmpty', function() {
    it('should be empty', function() {
      expect(httpBufferService.isBufferEmpty()).toBeTruthy();
    });
  });

  describe('Function: retryAllRequest', function() {
    var bufferRequestDefer;
    beforeEach(function() {
      var config = {
          id: 1
        };

      bufferRequestDefer = $q.defer();

      httpBufferService.add(config, bufferRequestDefer);
    });

    it('should resolve http request', function() {
      var rejected = false;

      httpBufferService.retryAllRequest();
      bufferRequestDefer.promise.catch(function() {
        rejected = true;
      });
      requestDefer.reject();
      $scope.$digest();
      expect(rejected).toBeTruthy();
    });

    it('should reject http request', function() {
      var resolved = false;
      
      httpBufferService.retryAllRequest();
      bufferRequestDefer.promise.then(function() {
        resolved = true;
      });
      requestDefer.resolve();
      $scope.$digest();
      expect(resolved).toBeTruthy();
    });
  });
});