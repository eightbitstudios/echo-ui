angular.module('echo.components.modal.milestones.locationSearch', [
  'echo.components.typeaheadSearch',
  'echo.api.location',
  'echo.components.modal.milestones.locationSearch.selectedLocation'
])
  .component('locationSearch', {
    templateUrl: 'app/common/components/modal/milestones/components/location-search/location-search.template.html',
    bindings: {
      location: '='
    },
    controller: function (locationApi) {
      var that = this;

      that.searchLocation = function(val) {
        return locationApi.fetchLocations(val).then(function(locations){
          return _.map(locations, function(location){
            return {
              name: _.join([location.cityName, location.stateCode], ', '),
              stateId: location.stateId
            };
          });
        });
      };

      that.selectedLocation = function(selected) {
        that.location.setLocation(_.get(selected, 'name'));
        that.location.stateId = _.get(selected, 'stateId');
      };
    }
  });