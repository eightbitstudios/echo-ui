angular.module('echo.components.modal.milestones.locationSearch.selectedLocation', [
  'echo.components.typeaheadSearch',
  'echo.api.location'
])
  .component('selectedLocation', {
    templateUrl: 'selected-location.component.html',
    bindings: {
      selectedLocation: '=',
      removeCallback: '&'
    }
  });