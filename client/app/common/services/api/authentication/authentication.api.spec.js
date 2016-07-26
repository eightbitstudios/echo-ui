describe('Api: authenticationApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    authenticationApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.authentication', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
    });

    inject(function ($rootScope, _$q_, _$http_, _apiConfig_, _authenticationApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      authenticationApi = _authenticationApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: createPassword', function () {

    it('should make a POST request with token and user passwords', function (done) {
      var token = '1234';
      var userId = '1';
      var passwordChange = {
        newPassword: 'Newpassword123',
        confirmPassword: 'Newpassword123'
      };

      authenticationApi.createPassword(userId, token, passwordChange).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.createPassword({ userId: userId }), {
          password: passwordChange.newPassword,
          confirmPassword: passwordChange.confirmPassword,
          invitationToken: token
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
});
