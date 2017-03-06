
describe('Component: locationSearch', function () {
  var component, $q, location, locationApi, scope;

  beforeEach(function () {
    module('app/common/components/modal/milestones/components/location-search/location-search.component.html');
    module('echo.components.modal.milestones.locationSearch', function($provide) {
      $provide.value('locationApi', locationApi = jasmine.createSpyObj('locationApi', ['fetchLocations']));
    });
  });

  beforeEach(inject(function ($rootScope, _$q_, $compile, $componentController) {
    scope = $rootScope.$new();
    $q = _$q_;
    scope.ctrl = {
      getComponent: jasmine.createSpy('getComponent')
    };

    scope.$digest();
    location = jasmine.createSpyObj('location', ['setLocation']);
    component = $componentController('locationSearch', null, { 
      location: location
    });
  }));

  describe('Function: selectedLocation', function () {    

    it('should store search location value', function() {
      var selected = {
        name: 'Chicago, IL',
        stateId: 1
      };
      component.selectedLocation(selected);
      expect(component.location.setLocation).toHaveBeenCalledWith(selected.name);
    });
  });

  describe('Function: searchLocation', function () {    
    var searchLocationDefer;

    beforeEach(function() {
      searchLocationDefer = $q.defer();
      locationApi.fetchLocations.and.returnValue(searchLocationDefer.promise);
    });

    it('should search location', function() {
      var value = 'test';
      component.searchLocation(value);
      expect(locationApi.fetchLocations).toHaveBeenCalledWith(value);
    });

    it('should search location', function(done) {
      var locations = [{stateId: 1}, {stateId: 2}];
      searchLocationDefer.resolve(locations);
      component.searchLocation().then(function(locations) {
        expect(locations).toBeDefined();
        done();
      });
      scope.$digest();
    });
  });
});