angular.module('echo.components.modal.milestones.locationSearch.selectedLocation', [
  'echo.components.typeaheadSearch',
  'echo.api.location'
])
  .component('selectedLocation', {
    templateUrl: 'app/common/components/modal/milestones/components/location-search/components/selected-location/selected-location.template.html',
    bindings: {
      selectedLocation: '=',
      removeCallback: '&'
    },
    controller: function () {}
  });