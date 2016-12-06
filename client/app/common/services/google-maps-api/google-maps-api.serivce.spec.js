describe('Service: googleMapsApi', function() {
  'use strict';

  var $scope,
    $q,
    apiConfig,
    $window,
    googleMapsApi;

  beforeEach(function() {
    spyOn(document.body, 'appendChild');
    module('echo.services.googleMapsApi', function($provide){
      $provide.value('$window', $window = {});
    });

    inject(function($rootScope, _$q_, _googleMapsApi_, _apiConfig_) {
      $scope = $rootScope.$new();
      $q = _$q_;
      googleMapsApi = _googleMapsApi_;
      apiConfig = _apiConfig_;
    });
  });

  describe('Function: initMap', function() {
    it('should resolve promise once loaded', function() {
      $window.google = {
        id: 1
      };

      googleMapsApi.then(function(google) {
        expect(google).toEqual($window.google);
      });

      $window.initMap();
      $scope.$digest();
    });
  });
});