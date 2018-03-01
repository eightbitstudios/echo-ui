describe('Component: google-maps-marker', function () {
  var component;

  beforeEach( function() {
    module('echo.components.googleMapsMarkerLoadDetails');
    module('echo.services.googleMapsApi.mock');
    module('echo.config.mapConstants');
  });

  describe('controller', function () {

    beforeEach(inject(function ($componentController) {
      google = {maps: {}};
      google.maps.Point = function(x,y){ return {x:x, y:y};};
      component = $componentController('googleMapsMarkerLoadDetails', null, {});
    }));

    describe('getMarkerUrl()', function () {
      it('SHOULD return the configured asset url', function() {
        var url = component.getMarkerUrl('CURRENT_LOCATION');
        expect(url).toEqual('/assets/images/icon-gm-marker.png');
      });
    });


    describe('getMarkerAnchor', function () {
      it('SHOULD anchor current location markers', function() {
        var anchor = component.getMarkerAnchor('CURRENT_LOCATION');
        expect(anchor).toEqual({x:22, y:22});
      });

      it('SHOULD not anchor origin markers', function() {
        var anchor = component.getMarkerAnchor('ORIGIN');
        expect(anchor).not.toBeDefined();
      });

      it('SHOULD not anchor destination markers', function() {
        var anchor = component.getMarkerAnchor('DESTINATION');
        expect(anchor).not.toBeDefined();
      });
    });

  });
});
