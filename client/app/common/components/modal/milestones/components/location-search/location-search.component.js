angular.module('echo.components.modal.milestones.locationSearch', [
  'echo.components.typeaheadSearch',
  'echo.api.location'
])
  .component('locationSearch', {
    templateUrl: 'app/common/components/modal/milestones/components/location-search/location-search.template.html',
    bindings: {
      location: '='
    },
    controller: function (locationApi) {
      var that = this;

      that.defaultLocation = that.location.getLocationString();

      that.searchLocation = function(val) {
        return locationApi.fetchLocations(val).then(function(locations){
          return _.map(locations, function(location){
            return {
              name: _.join([location.cityName, location.stateCode], ', ')
            };
          });
        });
      };

      that.selectedLocation = function(selected) {
        that.location.setLocation(selected.name);
      };
    }
  });