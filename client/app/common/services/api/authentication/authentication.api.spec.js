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
      var passwordChange = {
        newPassword: 'Newpassword123',
        confirmPassword: 'Newpassword123'
      }
      authenticationApi.createPassword(token, passwordChange).then(function () {
        expect($http.post).toHaveBeenCalledWith(apiConfig.createPassword, {
          token: token, 
          newPassword: passwordChange.newPassword, 
          confirmPassword: passwordChange.confirmPassword
        });
        done();
      });

      $scope.$digest();
    });
  });
});
