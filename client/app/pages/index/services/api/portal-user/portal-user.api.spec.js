describe('Api: portalUserApi', function() {
  'use strict';

  var $scope,
    $q,
    $http,
    portalUserApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes,
    $window,
    store$,
    cookieService,
    portalUserReqConverterService,
    routesConfig;

  beforeEach(function() {

    module('echo.api.portalUser', function($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
      $provide.constant('$window', $window = {
        location: ''
      });
      $provide.constant('store$', store$ = jasmine.createSpyObj('store$', ['getState']));
      $provide.constant('cookieService', cookieService = jasmine.createSpyObj('cookieService', ['clearToken', 'clearRefreshToken']));
      $provide.constant('portalUserReqConverterService',
        portalUserReqConverterService = jasmine.createSpyObj('portalUserReqConverterService', ['convertPortalUser']));
    });

    inject(function($rootScope, _$q_, _$http_, _apiConfig_, _routesConfig_, _portalUserApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;
      routesConfig = _routesConfig_;

      portalUserApi = _portalUserApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: upsertPortalUser', function() {
    beforeEach(function() {
      spyOn(portalUserApi, 'updatePortalUserById');
      spyOn(portalUserApi, 'insertPortalUser');
    });

    it('should update user', function() {
      var user = {
        id: 1,
        firstName: 'test'
      };

      portalUserApi.upsertPortalUser(user);
      expect(portalUserApi.updatePortalUserById).toHaveBeenCalledWith(user);
    });

    it('should create user', function() {
      var user = {
        firstName: 'test'
      };

      portalUserApi.upsertPortalUser(user);
      expect(portalUserApi.insertPortalUser).toHaveBeenCalledWith(user);
    });
  });

  describe('Function: updatePortalUserById', function() {
    it('should call update user endpoint', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      putRes.data = {
        data: ''
      };
      portalUserReqConverterService.convertPortalUser.and.returnValue(user);

      portalUserApi.updatePortalUserById(user).then(function() {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.userById)({
          userId: user.id
        }), user);
        done();
      });

      $scope.$digest();
    });

    it('should catch update user error', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      $http.put.and.returnValue($q.reject(putRes = {}));
      putRes.data = {
        status: {
          code: 500
        }
      };

      portalUserApi.updatePortalUserById(user).catch(function(error) {
        expect(error).toBe(putRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: deactivatePortalUserById', function() {
    it('should call deactivate user endpoint', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      store$.getState.and.returnValue({
        user: {
          id: 3
        }
      });

      putRes.data = {
        data: ''
      };

      portalUserReqConverterService.convertPortalUser.and.returnValue(user);

      portalUserApi.deactivatePortalUserById(user).then(function() {
        expect($http.put).toHaveBeenCalledWith(_.template(apiConfig.deactivateUserById)({
          userId: user.id
        }), user);
        done();
      });

      $scope.$digest();
    });

    it('should sign out user if they are logged in', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      store$.getState.and.returnValue({
        user: {
          userId: 1
        }
      });

      putRes.data = {
        data: ''
      };

      portalUserApi.deactivatePortalUserById(user).then(function() {
        expect(cookieService.clearToken).toHaveBeenCalled();
        expect(cookieService.clearRefreshToken).toHaveBeenCalled();
        expect($window.location).toEqual(routesConfig.LOGIN.base.url);
        done();
      });

      $scope.$digest();
    });

    it('should catch deactivate user error', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      $http.put.and.returnValue($q.reject(putRes = {}));
      putRes.data = {
        status: {
          code: 500
        }
      };

      portalUserApi.deactivatePortalUserById(user).catch(function(error) {
        expect(error).toBe(putRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: insertPortalUser', function() {
    it('should call insert user endpoint', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      postRes.data = {
        data: ''
      };

      portalUserReqConverterService.convertPortalUser.and.returnValue(user);

      portalUserApi.insertPortalUser(user).then(function() {
        expect($http.post).toHaveBeenCalledWith(apiConfig.user, user);
        done();
      });

      $scope.$digest();
    });

    it('should catch insert user error', function(done) {
      var user = {
        id: 1,
        firstName: 'test'
      };

      $http.post.and.returnValue($q.reject(postRes = {}));
      postRes.data = {
        status: {
          code: 500
        }
      };

      portalUserApi.insertPortalUser(user).catch(function(error) {
        expect(error).toBe(postRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: resendInviteToPortalUserById', function() {
    it('should call resend user invite endpoint', function(done) {
      var userId = 1;

      postRes.data = {
        data: ''
      };

      portalUserApi.resendInviteToPortalUserById(userId).then(function() {
        expect($http.post).toHaveBeenCalledWith(_.template(apiConfig.resendInviteToUserById)({userId: userId}), {});
        done();
      });

      $scope.$digest();
    });

    it('should catch resend user invite error', function(done) {
      var userId = 1;

      $http.post.and.returnValue($q.reject(postRes = {}));
      postRes.data = {
        status: {
          code: 500
        }
      };

      portalUserApi.resendInviteToPortalUserById(userId).catch(function(error) {
        expect(error).toBe(postRes.data.status.code);
        done();
      });

      $scope.$digest();
    });
  });
});