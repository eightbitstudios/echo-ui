describe('Component: google-maps-marker', function () {
  var component;

  beforeEach( function() {
    module('echo.components.googleMapsMarker');
    module('echo.services.googleMapsApi.mock');
  });

  describe('controller', function () {

    beforeEach(inject(function ($componentController) {
      google.maps.Point = function(x,y){ return {x:x, y:y};};
      component = $componentController('googleMapsMarker', null, {});
    }));

    afterEach(function() {
      google = {maps: {}};
    });

    describe('getMarkerUrl()', function () {
      it('SHOULD return the configured asset url', function() {
        var url = component.getMarkerUrl('TRACK_AND_TRACE');
        expect(url).toEqual('/assets/images/icon-gm-track-n-trace-marker.png');
      });
    });


    describe('getMarkerAnchor', function () {
      it('SHOULD anchor track and trace markers', function() {
        var anchor = component.getMarkerAnchor('TRACK_AND_TRACE');
        expect(anchor).toEqual({x:10, y:10});
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
