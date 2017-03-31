describe('Api: languageApi', function () {
  'use strict';

  var $scope,
    $q,
    $http,
    languageApi,
    apiConfig,
    getRes,
    postRes,
    putRes,
    deleteRes;

  beforeEach(function () {

    module('echo.api.language', function ($provide) {
      $provide.value('$http', $http = jasmine.createSpyObj('$http', ['get', 'post', 'put', 'delete']));
    });

    inject(function ($rootScope, _$q_, _apiConfig_, _languageApi_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      apiConfig = _apiConfig_;

      languageApi = _languageApi_;
    });

    $http.get.and.returnValue($q.when(getRes = {}));
    $http.post.and.returnValue($q.when(postRes = {}));
    $http.put.and.returnValue($q.when(putRes = {}));
    $http.delete.and.returnValue($q.when(deleteRes = {}));
  });

  describe('Function: fetchLanguages', function () {
    it('should make a get request to fetch languages', function (done) {
      getRes.data = { data: '' };

      languageApi.fetchLanguages().then(function () {
        expect($http.get).toHaveBeenCalledWith(apiConfig.language);
        done();
      });

      $scope.$digest();
    });
  });
});
