describe('Component: googleMaps', function () {
  var scope, component, $q, $element, googleMapsApi, googleMapsStyles, google, appConstants;

  beforeEach(function () {
    module('echo.components.googleMaps', function ($provide) {
      $provide.value('$element', $element = [{}]);
      $provide.value('googleMapsApi', googleMapsApi = {then: function(callback) {callback(google);}});
      $provide.constant('googleMapsStyles', googleMapsStyles = {});
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController, _appConstants_) {
    scope = $rootScope.$new();
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    $q = _$q_;
    appConstants = _appConstants_;

    google = {
      maps: {
        Map: jasmine.createSpy('Map'),
        LatLngBounds: jasmine.createSpy('LatLngBounds')
      }
    };

    component = $componentController('googleMaps', null, {
      center: {lat: 30, lng: 50}
    });
  }));

  describe('Function: $onInit', function () {

    it('should set map and bounds at default other zoom', function () {
      component.totalPoints = 2;
      component.$onInit();

      scope.$digest();

      expect(google.maps.Map).toHaveBeenCalledWith($element[0], {
        center: component.center,
        zoom: appConstants.DEFAULT_MAP_ZOOM.OTHER,
        styles: googleMapsStyles,
        clickableIcons: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false
      });
      expect(google.maps.LatLngBounds).toHaveBeenCalled();
    });

    it('should set map and bounds at default one point zoom', function () {
      component.totalPoints = 1;
      component.$onInit();

      scope.$digest();

      expect(google.maps.Map).toHaveBeenCalledWith($element[0], {
        center: component.center,
        zoom: appConstants.DEFAULT_MAP_ZOOM.ONE_POINT,
        styles: googleMapsStyles,
        clickableIcons: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: false
      });
      expect(google.maps.LatLngBounds).toHaveBeenCalled();
    });

  });

});
