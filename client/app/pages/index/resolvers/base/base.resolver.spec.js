describe('Resolver: Base', function () {
  'use strict';

  var $scope,
    repApi,
    cookieService,
    userProfileService,
    baseResolver;

  beforeEach(function () {
    module('echo.index.resolvers.base', function ($provide) {
      $provide.value('cookieService', cookieService = jasmine.createSpyObj('cookieService', ['getToken']));
      $provide.value('userProfileService', userProfileService = jasmine.createSpyObj('userProfileService', ['mapJwtToUser', 'setUser', 'getUser']));
      $provide.value('repApi', repApi = jasmine.createSpyObj('repApi', ['fetchRepByCarrierId']));
    });

    inject(function ($rootScope, _baseResolver_) {
      $scope = $rootScope.$new();
      baseResolver = _baseResolver_;
    });
  });

  describe('Function: user', function() {
    it('should fetch user if cookie exists', function(done) {
      var user = {
        id: 1
      };

      cookieService.getToken.and.returnValue(true);
      userProfileService.getUser.and.returnValue(user);

      baseResolver.user().then(function(mappedUser){
        expect(mappedUser).toEqual(user);
        done();
      });
      $scope.$digest();
    });
    
    it('should not fetch user if cookie does not exist', function(done) {

      cookieService.getToken.and.returnValue(false);
      
      baseResolver.user().then(function(mappedUser){
        expect(mappedUser).toBeUndefined();
        done();
      });
      $scope.$digest();
    });
  });

  describe('Function: repDetails', function() {
    it('should fetch rep details', function() {
      var user = {
        carrierId: 1
      };

      baseResolver.repDetails(user);
      expect(repApi.fetchRepByCarrierId).toHaveBeenCalledWith(user.carrierId);
    });
  });
});
