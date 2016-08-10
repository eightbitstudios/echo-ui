describe('Api: authenticationApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    $base64,
    authenticationApi,
    cookieService,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.authentication', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
      $provide.value('$base64', $base64 = jasmine.createSpyObj('$base64', ['encode']));
      $provide.value('cookieService', cookieService = jasmine.createSpyObj('cookieService', ['setRefreshToken', 'setToken', 'clearToken', 'clearRefreshToken']));
    });

    inject(function ($rootScope, _$q_, _apiConfig_, _authenticationApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      authenticationApi = _authenticationApi_;
    });
    $base64.encode.and.returnValue('test');
    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {
      data: {
        data: {
          refresh_token: ''
        }
      }
    }));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: createPassword', function () {

    it('should make a POST request with token and user passwords', function (done) {
      var token = '1234';
      var userId = '1';
      var oneLoginId = '2';
      var passwordChange = {
        newPassword: 'Newpassword123',
        confirmPassword: 'Newpassword123'
      };

      authenticationApi.createPassword(userId, oneLoginId, token, passwordChange).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.createPassword({ userId: userId }), {
          password: passwordChange.newPassword,
          confirmPassword: passwordChange.confirmPassword,
          invitationToken: token,
          oneLoginId: oneLoginId
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: signIn', function () {

    it('should make a POST request with username and password', function (done) {
      var username = 'test@gmail.com',
        password = 'Test1234';

      authenticationApi.signIn(username, password).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.signIn, {
          username: username,
          password: password
        }, {
            headers: {
              'Authorization': 'Basic test'
            }
          });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: signOut', function () {

    it('should make a POST request with userId', function (done) {
      var userId = 123;

      authenticationApi.signOut(userId).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.signOut, {
          userId: userId
        });
        done();
      });

      $scope.$digest();
    });
  });
  describe('Function: forgotPassword', function () {

    it('should make a POST request with username and password', function (done) {
      var username = 'test@gmail.com';

      authenticationApi.forgotPassword(username).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.forgotPassword, {
          username: username
        });
        done();
      });

      $scope.$digest();
    });
  });

  describe('Function: changePassword', function () {

    it('should make a PUT request with new and current password', function (done) {
      var userId = 1,
      currentPassword = 'Test1234',
      passwordChange = {
        newPassword: 'Password1234',
        confirmPassword: 'Password1234'
      };
      
      authenticationApi.changePassword(userId, currentPassword, passwordChange).then(function () {
        expect($http.put).toHaveBeenCalledWith(apiConfig.changePassword({userId: userId}), {
          currentPassword: currentPassword,
          paassword: passwordChange.newPassword,
          confirmPassword: passwordChange.confirmPassword
        });
        done();
      });

      $scope.$digest();
    });
  });
});
