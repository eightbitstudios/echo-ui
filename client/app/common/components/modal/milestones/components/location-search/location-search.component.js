angular.module('echo.components.modal.milestones.locationSearch', [
  'echo.components.typeaheadSearch',
  'echo.api.location'
])
  .component('locationSearch', {
    templateUrl: 'app/common/components/modal/milestones/components/location-search/location-search.template.html',
    bindings: {
    },
    controller: function (locationApi) {
      var that = this;

      that.selected = null;

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
        that.selected = selected;
      };
    }
  });