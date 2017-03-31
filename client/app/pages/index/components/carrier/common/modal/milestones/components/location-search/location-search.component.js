angular.module('echo.components.modal.milestones.locationSearch', [
    'echo.components.typeaheadSearch',
    'echo.api.location',
    'echo.components.modal.milestones.locationSearch.selectedLocation'
  ])
  .component('locationSearch', {
    templateUrl: 'location-search.component.html',
    bindings: {
      location: '='
    },
    controller: function(locationApi) {

      this.searchLocation = function(val) {
        return locationApi.fetchLocations(val).then(function(locations) {
          return _.map(locations, function(location) {
            return {
              name: _.join([location.cityName, location.stateCode], ', '),
              stateId: location.stateId,
              countryCD: location.countryCD
            };
          });
        });
      };

      this.selectedLocation = function(selected) {
        this.location.setLocation(_.get(selected, 'name'));
        this.location.stateId = _.get(selected, 'stateId');
        this.location.countryCD = _.get(selected, 'countryCD');
      };
    }
  });